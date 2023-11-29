const transactions = JSON.parse(localStorage.getItem("transactionList")) || [];
const incomeValue = document.getElementById("total-income");
const expenseValue = document.getElementById("total-expense");
const balanceStatus = document.getElementById("balance-status");
const balanceContainer =  document.getElementById('balance-container') ;

const incomeData = [];
const expenseData = [];

function sumCalculator(array) {
  let expenseSum = 0;
  let incomeSum = 0;

  array.forEach((transaction) => {
    if (transaction.type === "Expense") {
      expenseSum += transaction.amount;
      expenseValue.innerHTML = expenseSum;
      expenseData.push(transaction.amount);
    } else if (transaction.type === "Income") {
      incomeSum += transaction.amount;
      incomeValue.innerHTML = incomeSum;
      incomeData.push(transaction.amount);
    }
  });
  balanceStatusCalculator(array);
}

function balanceStatusCalculator(array) {
  let balanceStatusNumber = 0;
  array.forEach((value) => {
    if (value.type == "Expense") {
      balanceStatusNumber -= value.amount;
      balanceStatus.innerHTML = balanceStatusNumber;
      balanceStatusNumber < 0 ? balanceContainer.classList.add("negative") : balanceContainer.classList.add('positive') ;
      console.log('positive')
    } else {
      balanceStatusNumber += value.amount;
      balanceStatus.innerHTML = balanceStatusNumber;
      balanceStatusNumber < 0 ? balanceContainer.classList.add("negative") : balanceContainer.classList.add('positive') ;
    }
    
  });
}

sumCalculator(transactions);

const incomeChart = document.getElementById("incomeChart");

new Chart(incomeChart, {
  type: "line",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "Your Income",
        data: incomeData,
        borderWidth: 1,
        borderWidth: 2,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  },
  options: {
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
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "Your Expenses",
        data: expenseData,
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});


const date  = new Date() ; 
console.log(date.getFullYear())