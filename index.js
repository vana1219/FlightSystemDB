const express = require('express');
const app = express();
const cors = require('cors');

const AppDAO = require('./DAO');
const Repository = require('./Repository');
const Customer = require('./model');

app.use(express.static('public'));

// middleware
app.use(cors());
app.use(express.json());

//ROUTES

//get all todo
app.get('/Customer', async (req, res) => {
  try {
    console.log('try to fetch');
    const allTodos = await customerRepository.getAllTodos();
    console.log('get all todos ', allTodos);
    res.json(allTodos);
  } catch (err) {
    console.log(err.message);
  }
});

//get a todo by id
app.get('/customer/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await customerRepository.getCustomerById(id);
    console.log("get customer by id ", customer);
    res.json(todo);
  } catch (err) {
    console.log(err.message);
  }
});

//insert a todo
app.post('/customer', async (req, res) => {
  try {
    const { Lname, Fname, DOB, pnumber, gender, email } = req.body;
    const newCustomer = await customerRepository.insertCustomer(Lname, Fname, DOB, pnumber, gender, email);
    console.log("insert customer ", newCustomer);
    res.json(newTodo);
  } catch (err) {
    console.log(err.message);
  }
}); 

app.get('*', function (req, res) {
  path = __dirname + '/public/index.html';
  res.sendFile(path);
});

const dao = new AppDAO();
const customerRepository = new Repository(dao);
customerRepository.createTable();

app.listen(5500, () => {
  console.log('server has started on port 5500');
});