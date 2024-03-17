const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const { badRequest, created, ok, conflict } = require("../../utils");

const data = {
  employees: require("./employee.json"),
  setEmployees(data) {
    this.employees = data;
  },
};

const getEmployees = (req, res) => {
  ok(res, "get employees", data.employees);
};

const postEmployee = (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) return badRequest(res, "isi field yang perlu diisi");
  const duplicate = data.employees.find((e) => e.name === name);
  if (duplicate) return conflict(res, "data sudah terdaftar");
  const newEmployee = { id: uuidv4(), name, age };
  data.setEmployees([...data.employees, newEmployee]);
  fs.writeFileSync(path.join(__dirname, "employee.json"), JSON.stringify(data.employees));
  created(res, "post data success", newEmployee);
};

const updateEmployee = (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  if (!name || !age) return badRequest(res, "isi field yang perlu diisi");
  const match = data.employees.find((e) => e.id.toString() === id);
  if (!match) return conflict(res, "data tidak ditemukan");
  const otherData = data.employees.filter((e) => e.id !== id);
  const currentData = { ...match, name, age };
  data.setEmployees([...otherData, currentData]);
  fs.writeFileSync(path.join(__dirname, "employee.json"), JSON.stringify(data.employees));
  ok(res, "update data success", currentData);
};

const deleteEmployee = (req, res) => {
  const { id } = req.params;
  const match = data.employees.find((e) => e.id.toString() === id);
  if (!match) return conflict(res, "data tidak ditemukan");
  const otherData = data.employees.filter((e) => e.id !== id);
  data.setEmployees(otherData);
  fs.writeFileSync(path.join(__dirname, "employee.json"), JSON.stringify(data.employees));
  ok(res, "delete data success", match);
};

module.exports = { getEmployees, postEmployee, updateEmployee, deleteEmployee };
