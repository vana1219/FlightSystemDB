import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import AppDAO from './DAO.js';
import Repository from './repositiory.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize DAO and Repository
const dao = new AppDAO();
const customerRepository = new Repository(dao);
customerRepository.createCustomerTable();

// Routes

// Get all customers
app.get('/Customer', async (req, res) => {
  try {
    console.log('try to fetch');
    const allCustomers = await customerRepository.getAllCustomers();
    console.log('get all todos ', allCustomers);
    res.json(allCustomers);
  } catch (err) {
    console.log(err.message);
  }
});

// Get a customer by ID
app.get('/Customer/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await customerRepository.getCustomerById(id);
    console.log("get customer by id ", customer);
    res.json(customer);
  } catch (err) {
    console.log(err.message);
  }
});

// Insert a new customer
app.post('/Customer', async (req, res) => {
  try {
    const { Lname, Fname, DOB, pnumber, gender, email } = req.body;
    const newCustomer = await customerRepository.insertCustomer(Lname, Fname, DOB, pnumber, gender, email);
    console.log("insert customer ", newCustomer);
    res.json(newCustomer);
  } catch (err) {
    console.log(err.message);
  }
});

// Serve index.html for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(3000, () => {
  console.log('server has started on port 3000');
});