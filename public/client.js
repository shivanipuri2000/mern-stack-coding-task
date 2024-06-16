document.addEventListener('DOMContentLoaded', () => {
  const addTransactionBtn = document.getElementById('add-transaction-btn');
  const transactionModal = document.getElementById('transaction-modal');
  const closeModal = document.querySelector('.close');
  const transactionForm = document.getElementById('transaction-form');
  const transactionTableBody = document.querySelector('#transaction-table tbody');
  
  const totalBalanceEl = document.getElementById('total-balance');
  const totalIncomeEl = document.getElementById('total-income');
  const totalExpensesEl = document.getElementById('total-expenses');
  
  let transactions = [];

  addTransactionBtn.addEventListener('click', () => {
    transactionModal.style.display = 'block';
  });

  closeModal.addEventListener('click', () => {
    transactionModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === transactionModal) {
      transactionModal.style.display = 'none';
    }
  });

  transactionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const newTransaction = {
      date: event.target.date.value,
      description: event.target.description.value,
      amount: parseFloat(event.target.amount.value),
      status: event.target.status.value,
    };

    transactions.push(newTransaction);
    updateTransactionsTable();
    updateSummary();
    transactionModal.style.display = 'none';
    transactionForm.reset();
  });

  function updateTransactionsTable() {
    transactionTableBody.innerHTML = '';
    transactions.forEach((transaction, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${transaction.date}</td>
        <td>${transaction.description}</td>
        <td>${transaction.amount.toFixed(2)}</td>
        <td>${transaction.status}</td>
      `;
      transactionTableBody.appendChild(row);
    });
  }

  function updateSummary() {
    let totalBalance = 0;
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(transaction => {
      if (transaction.amount > 0) {
        totalIncome += transaction.amount;
      } else {
        totalExpenses += Math.abs(transaction.amount);
      }
      totalBalance += transaction.amount;
    });

    totalBalanceEl.textContent = `$${totalBalance.toFixed(2)}`;
    totalIncomeEl.textContent = `$${totalIncome.toFixed(2)}`;
    totalExpensesEl.textContent = `$${totalExpenses.toFixed(2)}`;
  }
});