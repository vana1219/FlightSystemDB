const queries = {
    createTable: `CREATE TABLE IF NOT EXISTS customer (
        custID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	Lname VARCHAR(50) NOT NULL,
	Fname VARCHAR(50) NOT NULL,
	DOB DATE Not NULL,
	pnumber VARCHAR (15) NOT NULL,
	gender VARCHAR(10) NOT NULL,
	email	 VARCHAR(50) NOT NULL) `,
    insertCustomer: `INSERT INTO customer (Lname, Fname, DOB, pnumber, gender, email) VALUES (?, ?, ?, ?, ?, ?)`,
    getCustomerById: `SELECT * FROM customer WHERE custID = ?`,
    selectCustomer: `SELECT * FROM customer`,
  };
  
  module.exports = queries;