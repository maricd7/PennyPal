const transactions = JSON.parse(localStorage.getItem("transactionList")) || [];
const incomeValue = document.getElementById("total-income");
const expenseValue = document.getElementById("total-expense");
const balanceStatus = document.getElementById("balance-status");
const balanceContainer = document.getElementById("balance-container");
const transactionHistoryContainer = document.getElementById(
  "transactions-history"
);

const incomeData = [];
const expenseData = [];
let firstDate, lastDate;
const expenseTransactionNames = [];
const incomeTransactionNames = [];

function sumCalculator(array) {
  let expenseSum = 0;
  let incomeSum = 0;

  array.forEach((transaction) => {
    if (transaction.type === "Expense") {
      expenseSum += transaction.amount;
      expenseData.push(transaction.amount);
      expenseTransactionNames.push(transaction.name);
    } else if (transaction.type === "Income") {
      incomeSum += transaction.amount;
      incomeData.push(transaction.amount);
      incomeTransactionNames.push(transaction.name);
    }
  });
  expenseValue.innerHTML = expenseSum;
  incomeValue.innerHTML = incomeSum;
  balanceStatusCalculator(array);
}

function balanceStatusCalculator(array) {
  let balanceStatusNumber = 0;
  array.forEach((value) => {
    if (value.type == "Expense") {
      balanceStatusNumber -= value.amount;
      balanceStatus.innerHTML = balanceStatusNumber;
      balanceStatusNumber < 0
        ? balanceContainer.classList.add("negative")
        : balanceContainer.classList.add("positive");
    } else {
      balanceStatusNumber += value.amount;
      balanceStatus.innerHTML = balanceStatusNumber;
      if (balanceStatusNumber < 0) {
        balanceContainer.classList.remove("positive");
        balanceContainer.classList.add("negative");
      } else {
        balanceContainer.classList.remove("negative");
        balanceContainer.classList.add("positive");
      }
    }
  });
}

sumCalculator(transactions);

const incomeChart = document.getElementById("incomeChart");

new Chart(incomeChart, {
  type: "line",
  data: {
    labels: incomeTransactionNames,
    datasets: [
      {
        label: "Your Income",
        data: incomeData,
        borderWidth: 1,
        borderWidth: 2,
        borderColor: "rgba(142, 245, 142, 1)",
        backgroundColor: "rgba(142, 245, 142, 1)",
        pointBackgroundColor: "rgba(142, 245, 142, 1)",
      },
    ],
  },
  options: {
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
const expenseChart = document.getElementById("expenseChart");

new Chart(expenseChart, {
  type: "line",
  data: {
    labels: expenseTransactionNames,
    datasets: [
      {
        label: "Your Expenses",
        data: expenseData,
        borderWidth: 1,
        borderColor: "rgba(255, 0, 43, 1)",
        backgroundColor: "rgba(255, 0, 43, 1)",
        pointBackgroundColor: "rgba(255, 0, 43, 1)",
      },
    ],
  },
  options: {
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

transactions.forEach((transaction) => {
  let thContainer = document.createElement("div");
  thContainer.classList.add("thcontainer");

  let thtdContainer = document.createElement("div");
  thtdContainer.classList.add("thtdcontainer");

  let thAmount = document.createElement("p");
  thAmount.innerHTML = transaction.amount;
  thAmount.classList.add("history-amount");

  let thName = document.createElement("p");
  thName.innerHTML = transaction.name;
  thName.classList.add("history-name");

  let thDate = document.createElement("p");
  thDate.innerHTML = transaction.date;
  thDate.classList.add("history-date");

  thtdContainer.appendChild(thName);
  thtdContainer.appendChild(thDate);
  thContainer.appendChild(thtdContainer);
  thContainer.appendChild(thAmount);
  transactionHistoryContainer.appendChild(thContainer);
});
