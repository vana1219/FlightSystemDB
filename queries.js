const queries = {
    createTable: `CREATE TABLE IF NOT EXISTS customer (
        custID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	Lname VARCHAR(50),
	Fname VARCHAR(50) NOT NULL,
	DOB DATE,
	pnumber VARCHAR (15),
	gender VARCHAR(10),
	email	 VARCHAR(50)) `,
    insertCustomer: `INSERT INTO customer (Lname, Fname, DOB, pnumber, gender, email) VALUES (?, ?, ?, ?, ?, ?)`,
    getCustomerById: `SELECT * FROM customer WHERE custID = ?`,
    selectCustomer: `SELECT * FROM customer`,
  };
  
  module.exports = queries;