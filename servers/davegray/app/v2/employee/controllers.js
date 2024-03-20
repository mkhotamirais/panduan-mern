const { noContent, badRequest, ok, conflict } = require("../../utils");
const Employee = require("./model");

const getEmployees = async (req, res) => {
  const data = await Employee.find().select("-__v");
  if (!data) return noContent(res, "employee tidak ditemukan");
  ok(res, "get employees", data);
};

const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Employee.findById(id).exec();
    if (!match) return badRequest(res, `employee id ${id} tidak ditemukan`);
    ok(res, "get single employee", match);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const postEmployee = async (req, res) => {
  try {
    const { name, age } = req.body;
    if (!name || !age) return badRequest(res, "isi field yang perlu diisi");
    const dup = await Employee.findOne({ name });
    if (dup) return conflict(res, "data sudah terdaftar");
    const data = await Employee.create(req.body);
    ok(res, `tambah data ${name} berhasil`, data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Employee.findById(id);
    if (!match) return badRequest(res, `employee id ${id} tidak ditemukan`);
    const data = await Employee.findByIdAndDelete(id);
    ok(res, `hapus data ${data.name} berhasil`, data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Employee.findById(id);
    if (!match) return badRequest(res, `employee id ${id} tidak ditemukan`);
    const { name, age } = req.body;
    if (!name || !age) return badRequest(res, "isi field yang perlu diisi");
    const data = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    ok(res, `update ${data.name} success`, data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

module.exports = { getEmployees, getEmployee, postEmployee, deleteEmployee, updateEmployee };
