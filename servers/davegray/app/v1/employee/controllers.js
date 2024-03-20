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
  const result = data.employees.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  ok(res, "get employees", result);
};

const getEmployee = (req, res) => {
  const { id } = req.params;
  const match = data.employees.find((e) => e.id === id);
  if (!match) return badRequest(res, `data id ${id} tidak ditemukan`);
  ok(res, "get employee", match);
};

const postEmployee = (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) return badRequest(res, "isi field yang perlu diisi");
  const dup = data.employees.find((e) => e.name === name);
  if (dup) return conflict(res, "data sudah terdaftar");
  req.body.id = uuidv4();
  req.body.createdAt = new Date().toISOString();
  req.body.updatedAt = new Date().toISOString();
  const newEmployee = req.body;
  data.setEmployees([...data.employees, newEmployee]);
  fs.writeFileSync(path.join(__dirname, "employee.json"), JSON.stringify(data.employees));
  created(res, `post ${name} success`, newEmployee);
};

const updateEmployee = (req, res) => {
  const { id } = req.params;
  const match = data.employees.find((e) => e.id?.toString() === id);
  if (!match) return badRequest(res, `data id ${id} tidak ditemukan`);
  const { name, age } = req.body;
  if (!name || !age) return badRequest(res, "isi field yang perlu diisi");
  req.body.updatedAt = new Date().toISOString();
  const otherData = data.employees.filter((e) => e.id !== id);
  const currentData = { ...match, ...req.body };
  data.setEmployees([...otherData, currentData]);
  fs.writeFileSync(path.join(__dirname, "employee.json"), JSON.stringify(data.employees));
  ok(res, `update ${name} success`, currentData);
};

const deleteEmployee = (req, res) => {
  const { id } = req.params;
  const match = data.employees.find((e) => e.id.toString() === id);
  if (!match) return badRequest(res, `data id ${id} tidak ditemukan`);
  const otherData = data.employees.filter((e) => e.id !== id);
  data.setEmployees(otherData);
  fs.writeFileSync(path.join(__dirname, "employee.json"), JSON.stringify(data.employees));
  ok(res, "delete data success", match);
};

module.exports = { getEmployees, getEmployee, postEmployee, updateEmployee, deleteEmployee };
