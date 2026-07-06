const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amt");
const expenseAmountEl = document.getElementById("expense-amt");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("Transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");


const transaction = JSON.parse(localStorage.getItem("Transaction")) || [];

transactionFormEl.addEventListener("submit", addTransaction);

function addTransaction(e){
    e.preventDefault()
    console.log(e)

    const description = descriptionEl.value.trim();
    const amount = parseFloat(amountEl.value);

    transaction.push({
        id:Date.now(),
        description,
        amount
    })

    localStorage.setItem("transaction",JSON.stringify(transaction))
    
    updateTransactionList();
    updateSummary();

    transactionFormEl.reset();
}

function updateTransactionList(){
    transactionListEl.innerHTML="";

    const sortedTransaction = [...transaction].reverse();
    const transactionEl = createTransactionEl(transaction);
    transactionListEl.appendChild(transactionEl);
}

function createTransactionEl(transaction){
    li = document.createElement("li");
    li.classList.add("Transaction");
    li.classList.add(transaction.amount > 0 ? "income" : "expense");

    li.innerHTML=`
    <span>${transaction.description}</span>
    <span>${transaction.value}
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
    </span>`;

    return li
}