const transactionName = document.getElementById('transaction-name'); 
const transactionType = document.getElementById('type-value'); 
const transactionDate = document.getElementById('date-value'); 
const transactionAmout = document.getElementById('amount-value'); 
const submitButton = document.getElementById('submit-transaction'); 

transactionType.addEventListener('change', ()=>{
    console.log(transactionType)
})
