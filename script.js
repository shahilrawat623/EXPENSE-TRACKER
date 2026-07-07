const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amt");
const expenseAmountEl = document.getElementById("expense-amt");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("Transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");


let transaction = JSON.parse(localStorage.getItem("Transaction")) || [];

transactionFormEl.addEventListener("submit", addTransaction);

function addTransaction(e){
    e.preventDefault()

    const description = descriptionEl.value.trim();
    const amount = parseFloat(amountEl.value);

    transaction.push({
        id:Date.now(),
        description,
        amount
    })

    localStorage.setItem("Transaction",JSON.stringify(transaction))
    
    updateTransactionList();
    updateSummary();

    transactionFormEl.reset();
}

function updateTransactionList(){
    transactionListEl.innerHTML="";
    const sortedTransaction = [...transaction].reverse();
    sortedTransaction.forEach((transaction)=>{

        const transactionEl = createTransactionEl(transaction);
        transactionListEl.appendChild(transactionEl);
    })
    }
    
function createTransactionEl(transaction){
    const li = document.createElement("li");
    li.classList.add("Transaction");
    li.classList.add(transaction.amount > 0 ? "income" : "expense");

    li.innerHTML=`
    <span>${transaction.description}</span>
    <span>${formatCurrency(transaction.amount)}
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    </span>`;
    return li
}

function updateSummary(){
    const balance = transaction.reduce((acc,transaction) => acc + transaction.amount, 0);

    const income = transaction.filter((transaction)=> transaction.amount > 0)
    .reduce((acc,transaction) => acc + transaction.amount,0)

    const expense = transaction.filter((transaction)=> transaction.amount < 0)
    .reduce((acc,transaction) => acc + transaction.amount,0)


    // update UI 
    balanceEl.textContent = formatCurrency(balance);
    incomeAmountEl.textContent= formatCurrency(income);
    expenseAmountEl.textContent= formatCurrency(expense);
}

function formatCurrency(number){
    return new Intl.NumberFormat("en-US", {
        style:"currency",
        currency:"USD",
    }).format(number);
}

function removeTransaction(id){
    transaction = transaction.filter((transaction) => transaction.id !== id)

    localStorage.setItem("Transaction",JSON.stringify(transaction))

    updateTransactionList();
    updateSummary();
}

//initial render
updateTransactionList();
updateSummary();
