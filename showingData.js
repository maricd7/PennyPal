const transactions = JSON.parse(localStorage.getItem("transactionList")) || [];
const incomeValue = document.getElementById("total-income");
const expenseValue = document.getElementById("total-expense");
const balanceStatus = document.getElementById("balance-status");
const balanceContainer = document.getElementById("balance-container");
const transactionHistoryContainer = document.getElementById("transactions-history");
const allFilter = document.getElementById("all");
const expenseFilter = document.getElementById("expense-filter");
const incomeFilter = document.getElementById("income-filter");
const lineFilterBtn = document.getElementById('line-filter') ;
const barFilterBtn  = document.getElementById('bar-filter');
const pieFilterBtn = document.getElementById('pie-filter');


const incomeData = [];
const expenseData = [];
let firstDate, lastDate;
const expenseTransactionNames = [];
const incomeTransactionNames = [];
const expenseHistory = [];
const incomeHistory = [];
const chartTypes = ['line','bar','pie'];
let chartType = 'line'; 

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
  type: chartType ,
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
  type: chartType ,
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
  if (transaction.type == "Expense") {
    thAmount.innerHTML = "-" + transaction.amount;
    thAmount.classList.add("history-amount-negative");
    expenseHistory.push(transaction);
  } else {
    thAmount.innerHTML = "+" + transaction.amount;
    thAmount.classList.add("history-amount-positive");
    incomeHistory.push(transaction)
  }

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

expenseFilter.addEventListener("click", () => {
  allFilter.classList.remove('active-filter'); 
  incomeFilter.classList.remove('active-filter')
  expenseFilter.classList.add('active-filter')
  transactionHistoryContainer.innerHTML = "";
  expenseHistory.forEach(expense=>{
    let thContainer = document.createElement("div");
    thContainer.classList.add("thcontainer");

    let thtdContainer = document.createElement("div");
    thtdContainer.classList.add("thtdcontainer");

    let thAmount = document.createElement("p");
    thAmount.innerHTML = "-" + expense.amount;
    thAmount.classList.add("history-amount-negative");

    let thName = document.createElement("p");
    thName.innerHTML = expense.name;
    thName.classList.add("history-name");

    let thDate = document.createElement("p");
    thDate.innerHTML = expense.date;
    thDate.classList.add("history-date");

    thtdContainer.appendChild(thName);
    thtdContainer.appendChild(thDate);
    thContainer.appendChild(thtdContainer);
    thContainer.appendChild(thAmount);
    transactionHistoryContainer.appendChild(thContainer);
  })

});

incomeFilter.addEventListener('click', ()=>{
  allFilter.classList.remove('active-filter'); 
  expenseFilter.classList.remove('active-filter');
  incomeFilter.classList.add('active-filter');

  transactionHistoryContainer.innerHTML = "";
  incomeHistory.forEach(income=>{
    let thContainer = document.createElement("div");
    thContainer.classList.add("thcontainer");

    let thtdContainer = document.createElement("div");
    thtdContainer.classList.add("thtdcontainer");

    let thAmount = document.createElement("p");
    thAmount.innerHTML = "+" + income.amount;
    thAmount.classList.add("history-amount-positive");

    let thName = document.createElement("p");
    thName.innerHTML = income.name;
    thName.classList.add("history-name");

    let thDate = document.createElement("p");
    thDate.innerHTML = income.date;
    thDate.classList.add("history-date");

    thtdContainer.appendChild(thName);
    thtdContainer.appendChild(thDate);
    thContainer.appendChild(thtdContainer);
    thContainer.appendChild(thAmount);
    transactionHistoryContainer.appendChild(thContainer);
  })
})
allFilter.addEventListener('click', ()=>{
  window.location.reload()
})

lineFilterBtn.addEventListener('click',()=>{
  
  chartType='line'
  console.log(chartType, 'chart')
})
barFilterBtn.addEventListener('click',()=>{
  chartType='bar'
  console.log(chartType, 'chart')
})
pieFilterBtn.addEventListener('click',()=>{
  console.log(expenseChart.data.datasets)
  expenseChart.update();
})
const datasets = expenseChart.data;
console.log(datasets);