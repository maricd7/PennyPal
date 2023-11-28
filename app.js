const transactionName = document.getElementById("transaction-name");
const transactionType = document.getElementById("type-value");
const transactionDate = document.getElementById("date-value");
const transactionAmout = document.getElementById("amount-value");
const submitButton = document.getElementById("submit-transaction");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const transactionsList = JSON.parse(localStorage.getItem("transactionList")) || [];
  const transaction = {};

  transaction.name = transactionName.value;
  transaction.type = transactionType.value;
  transaction.date = transactionDate.value;
  transaction.amount = parseFloat(transactionAmout.value);

  transactionsList.push(transaction);
  localStorage.setItem("transactionList", JSON.stringify(transactionsList));
});
