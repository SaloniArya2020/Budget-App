class UI{
  constructor(){
      this.budgetSubmit = document.getElementById('budget-submit');
      this.budgetInp = document.getElementById('budget-input');
      this.budgetAmt = document.getElementById('budget-amount');
      this.expenseAmt = document.getElementById('expense-amount');
      this.balance = document.getElementById('balance');
      this.balanceAmt = document.getElementById('balance-amount');
      this.expenseInp = document.getElementById('expense-input');
      this.amountInp = document.getElementById('amount-input');
      this.expenseSubmit = document.getElementById('expense-submit');
      this.expenseList = document.getElementById('expense-list');
      this.budgetFeedback = document.querySelector('.budget-feedback');
      this.expenseFeedback = document.querySelector('.expense-feedback');
      this.expenseForm = document.getElementById('expense-form');
      this.itemList = [];
      this.itemID = 0;
  }

  submitBudget(){
    const value = this.budgetInp.value;
    if(value !== '' && value>0){
      this.budgetAmt.textContent = value;
      this.showBalance();
      this.expenseForm.style.display = 'block';
      
    }else{
        this.budgetFeedback.style.display = 'block';

        setTimeout(()=>{
          this.budgetFeedback.style.display = 'none';
        },3000)
    }
  }

  submitExpense(){
    const amountVal = this.amountInp.value;
    const expenseVal = this.expenseInp.value;

    if(amountVal !== '' && amountVal > 0 && expenseVal !==''){
      let amount = parseInt(amountVal);
      this.expenseAmt.textContent = amount;

      let expense = {
        id: this.itemID,
        title: expenseVal,
        amount: amount
      }
      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      this.totalExpense();
      this.showBalance();
    }else{
      this.expenseFeedback.style.display = 'block';

        setTimeout(()=>{
          this.expenseFeedback.style.display = 'none';
        },3000)
    }
  }
  totalExpense(){
    let total= 0 ;
    if(this.itemList.length > 0){
      total = this.itemList.reduce((acc,curr) => {
        acc += curr.amount;
       return acc;
     }, 0);
    }
    this.expenseAmt.textContent = total;
    return total;
  }

  showBalance(){
    const expense = this.totalExpense();

    const total = parseInt(this.budgetAmt.textContent)- expense;

    this.balanceAmt.textContent = total;
    if(total >0){
      this.balance.classList.add('showGreen');
      this.balance.classList.remove('showRed');
      this.balance.classList.remove('showBlack');
    }else if(total<0){
      this.balance.classList.add('showRed');
      this.balance.classList.remove('showGreen');
      this.balance.classList.remove('showBlack');
    }else{
      this.balance.classList.remove('showRed');
      this.balance.classList.remove('showGreen');
      this.balance.classList.add('showBlack');
    }
  }
 
  addExpense(e){
    const div = document.createElement('div');
    div.className = 'expense';
    div.innerHTML = `
      <div class="expense-item d-flex justify-content-between align-items-baseline">

          <h6 class="expense-title mb-0 text-uppercase list-item">${e.title}</h6>
          <h5 class="expense-amount mb-0 list-item">${e.amount}</h5>

          <div class="expense-icons list-item">

            <a href="#" class="edit-icon mx-2" data-id="${e.id}">
              <i class="fas fa-edit"></i>
            </a>
            <a href="#" class="delete-icon" data-id="${e.id}">
              <i class="fas fa-trash"></i>
            </a>
          </div>
      </div>
    `
    this.expenseList.appendChild(div);
  }
  editIcon(e){
      if(e.target.parentElement.classList.contains('edit-icon')){
        const amount = e.target.parentElement.parentElement.previousElementSibling.textContent;
        const title = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.textContent;
        
        this.expenseInp.value = title;
        this.amountInp.value = amount;

        const parent = e.target.parentElement.parentElement.parentElement.parentElement;
        parent.remove();
        const id = parseInt(e.target.parentElement.dataset.id);
        
        let tempList = this.itemList.filter(function(item){
          return item.id !== id;
        });
        this.itemList = tempList;
        this.showBalance();
      }
  }
  deleteIcon(e){
      if(e.target.parentElement.classList.contains('delete-icon')){
        const parent = e.target.parentElement.parentElement.parentElement.parentElement;
        parent.remove();
        const id = parseInt(e.target.parentElement.dataset.id);

        let tempList = this.itemList.filter(function(item){
          return item.id !== id;
        })
        this.itemList = tempList;
        this.showBalance();
      }
  }
  clearFields(){
    this.budgetInp.value='';
    this.expenseInp.value = '';
    this.amountInp.value = '';
  }

  showExpense(){
    this.expenseList.innerHTML= (`
      <div class="expense">
        <div class="expense-item d-flex justify-content-between align-items-baseline">

          <h6 class="expense-title mb-0 text-uppercase list-item"> - ${this.expenseInp.value}</h6>
          <h5 class="expense-amount mb-0 list-item">${this.amountInp.value}</h5>

          <div class="expense-icons list-item">
            <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
            <i class="fas fa-edit"></i>
            </a>
            <a href="#" class="delete-icon" data-id="${expense.id}">
            <i class="fas fa-trash"></i>
            </a>
          </div>
        </div>
      </div>
    `)
  }
}

function  loadEventListener(){
    const budgetSubmit = document.getElementById('budget-submit');
    const expenseSubmit = document.getElementById('expense-submit');
    const expenseList = document.getElementById('expense-list');
    const expenseForm = document.getElementById('expense-form');
    
    expenseForm.style.display='none';

    const ui = new UI;
    budgetSubmit.addEventListener('click',(e)=>{
          ui.submitBudget();
          ui.clearFields();
        e.preventDefault();
    })

    expenseSubmit.addEventListener('click',(e)=>{
        ui.submitExpense();
        ui.clearFields();
      e.preventDefault();
    })

    expenseList.addEventListener('click',(e)=>{
      ui.deleteIcon(e);
      ui.editIcon(e);
      e.preventDefault();
    })
}
loadEventListener();