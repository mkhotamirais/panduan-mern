const { noContent, badRequest, ok } = require("../../utils");
const Employee = require("./model");

const getEmployees = async (req, res) => {
  const data = await Employee.find();
  if (!data) return noContent(res, "employee tidak ditemukan");
  ok(res, "get employees", data);
};

const getSingleEmployee = async (req, res) => {
  const { id } = req.params;
  if (!id) return badRequest(res, "id parameter diperlukan");
  try {
    const match = await Employee.findById(id).exec();
    if (!match) return noContent(res, `tidak ada id yang cocok dengan id ${id}`);
    ok(res, "get single employee", match);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const postEmployee = async (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) return badRequest(res, "isi field yang perlu diisi");
  // const duplicate = data.employees.findOne({name});
  // if (duplicate) return conflict(res, "data sudah terdaftar");
  try {
    const data = await Employee.create({ name, age });
    ok(res, `tambah data ${name} berhasil`, data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  if (!id) return badRequest(res, "id parameter diperlukan");
  try {
    // const match = await Employee.findById(id).exec();
    // if (!match) return noContent(res, `tidak ada id yang cocok dengan id ${id}`);
    const data = await Employee.findByIdAndDelete(id);
    ok(res, `hapus data ${data.name} berhasil`, data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  // if (!id) return badRequest(res, "id parameter diperlukan");
  if (!name || !age) return badRequest(res, "isi field yang perlu diisi");
  // const match = await Employee.findById(id).exec();
  // if (!match) return noContent(res, `tidak ada id yang cocok dengan id ${id}`);
  try {
    const data = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    ok(res, `berhasil update ${data.name}`, data);
  } catch (error) {
    badRequest(res, error.message);
  }
};

module.exports = { getEmployees, getSingleEmployee, postEmployee, deleteEmployee, updateEmployee };
