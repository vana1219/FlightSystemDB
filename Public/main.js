// set global variable todos
let customers = [];

// function to set todos
const setCustomer = (data) => {
  customers = data;
};

// function to display todos
const displayCustomer = () => {
    customers.sort((a, b) => a.custID - b.custID);
    
    const customerTableBody = document.querySelector('#todo-table tbody');
    let tableHTML = '';
  
    customers.forEach((customer) => {
      tableHTML += `
        <tr>
          <td>${customer.Fname}</td>
        </tr>
      `;
    });
  
    customerTableBody.innerHTML = tableHTML;
  };
  

// select all the todos when the codes first run
console.log('start');
selectCustomer();
console.log('started');

// The following are async function to select, insert, update and delete todos
// select all the todos
async function selectCustomer() {
  // use try... catch... to catch error
  try {
    console.log('try to select');
    // GET all todos from "http://localhost:3000/todos"
    const response = await fetch('http://127.0.0.1:5500/Public/index.html', {
      // const response = await fetch("/todos", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    // connect to heroku, remove localhost:port
    // const response = await fetch("/todos")
    const jsonData = await response.json();

    setCustomer(jsonData);
    displayCustomer();
  } catch (err) {
    console.log(err.message);
  }
}

async function insertCustomer() {
    const inputBox = document.querySelector('#Fname'); // Match the corrected HTML id
    const Fname = inputBox.value.trim(); // Trim whitespace
  
    if (!Fname) {
      alert('First Name cannot be empty.');
      return;
    }
  
    try {
      const body = { Fname: Fname };
      const response = await fetch('http://127.0.0.1:5500/Public/index.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
  
      // Refresh the customer list
      await selectCustomer();
      inputBox.value = ''; // Clear the input field
    } catch (err) {
      console.error('Error inserting customer:', err.message);
    }
  }
  