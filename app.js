import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import AppDAO from './DAO.js';
import Repository from './repositiory.js';
import { getFlights, getFlight } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize DAO and Repository
const dao = new AppDAO();
const customerRepository = new Repository(dao);
customerRepository.createTable();

// Routes

// Get all flights
app.get('/flights', async (req, res) => {
    console.log('Received request for /flights');
    try {
        const flights = await getFlights();
        res.json(flights);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Get a flight by ID
app.get('/flights/:id', async (req, res) => {
    console.log(`Received request for /flights/${req.params.id}`);
    try {
        const flight = await getFlight(req.params.id);
        res.json(flight);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Get all customers
app.get('/customers', async (req, res) => {
    try {
        console.log('Fetching all customers');
        const allCustomers = await customerRepository.getAllCustomers();
        console.log('All customers:', allCustomers);
        res.json(allCustomers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get a customer by ID
app.get('/customers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await customerRepository.getCustomerById(id);
        console.log('Customer by ID:', customer);
        res.json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Insert a new customer
app.post('/customers', async (req, res) => {
    try {
        const { Lname, Fname, DOB, pnumber, gender, email } = req.body;
        const newCustomer = await customerRepository.insertCustomer(Lname, Fname, DOB, pnumber, gender, email);
        console.log('Inserted customer:', newCustomer);
        res.json(newCustomer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Serve flight.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'flight.html'));
});

// Serve static files
app.use(express.static('public'));

// Serve index.html for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});