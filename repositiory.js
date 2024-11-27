import queries from './queries.js';

class Repository {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
    const sql = queries.createTable;
    return this.dao.run(sql);
  }

  insertCustomer(Lname, Fname, DOB, pnumber, gender, email) {
    return this.dao.run(queries.insertCustomer, [Lname, Fname, DOB, pnumber, gender, email]);
  } 

  getCustomerById(id) {
    return this.dao.run(queries.getCustomerById, [id]);
  }

  getAllCustomers() {
    return this.dao.run(queries.selectCustomer, []);
  }
}

export default Repository;