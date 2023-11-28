const transactions = JSON.parse(localStorage.getItem("transactionList")) || [];
const incomeValue = document.getElementById("total-income");
const expenseValue = document.getElementById("total-expense");
const balanceStatus = document.getElementById("balance-status");
const incomeData = [] ;
const expenseData= [] ; 
function sumCalculator(array) {
  let expenseSum = 0;
  let incomeSum = 0;

 
  array.forEach((transaction) => {
    if (transaction.type == "Expense") {
      expenseSum += transaction.amount;
      expenseValue.innerHTML = expenseSum;
      transactions.forEach(transaction =>{
        expenseData.push(transaction.amount)
    })
    } else if(transaction.type == 'Income') {
      incomeSum += transaction.amount;
      incomeValue.innerHTML = incomeSum;
      transactions.forEach(transaction =>{
        incomeData.push(transaction.amount)
    })
    console.log(transaction.amount, 'ovo je income')
    }
  });
  balanceStatusCalculator(array)
}

function balanceStatusCalculator(array){
    let balanceStatusNumber = 0 ; 
    array.forEach(value => {
        if (value.type == "Expense") {
            balanceStatusNumber-=value.amount ;
            balanceStatus.innerHTML = balanceStatusNumber
         }else{
            balanceStatusNumber+=value.amount ;
            balanceStatus.innerHTML = balanceStatusNumber
         }
    })
}

sumCalculator(transactions);

const incomeChart = document.getElementById('incomeChart');

  new Chart(incomeChart, {
    type: 'line',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: 'Your Income',
        data: incomeData,
        borderWidth: 1 , 
        borderWidth: 2, 
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)', 
        pointBackgroundColor: 'rgba(75, 192, 192, 1)', 
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  const expenseChart = document.getElementById('expenseChart');

  new Chart(expenseChart, {
    type: 'line',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: 'Your Expenses',
        data: expenseData,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });