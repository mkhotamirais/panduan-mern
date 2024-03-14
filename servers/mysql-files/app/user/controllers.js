const User = require("./model");
const path = require("path");
const fs = require("fs");
const { rootPath } = require("../../config/constants");

const GetUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const GetUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(400).json({ message: `User dengan id ${id} tidak ditemukan` });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const validationImage = (res, pathImg, message) => {
  if (fs.existsSync(pathImg)) fs.unlinkSync(pathImg);
  return res.status(400).json({ message });
};

const PostUser = async (req, res) => {
  const pathImg = req.file ? req.file.path : null;
  const ext = req.file ? path.extname(req.file.originalname) : null;
  try {
    const payload = req.body;
    if (!payload.name) res.status(400).json({ message: "Semua field perlu diisi" });
    if (req.file) {
      const validExt = [".jpg", ".jpeg", ".png"];

      if (!validExt.includes(ext)) return validationImage(res, pathImg, "Ekstensi tidak valid");
      if (req.file.size > 2000000) return validationImage(res, pathImg, "Ukuran maksimal 2Mb");

      fs.renameSync(pathImg, pathImg + ext);

      const newFilename = req.file.filename + ext;

      payload.image_name = newFilename;
      payload.image_url = `${req.protocol}://${req.get("host")}/images/users/${newFilename}`;

      await User.create(payload);
      res.status(201).json({ message: `Berhasil menambah user ${payload.name}` });
    } else {
      await User.create(payload);
      res.status(201).json({ message: `Berhasil menambah user ${payload.name}` });
    }
  } catch (error) {
    if (fs.existsSync(pathImg + ext)) fs.unlinkSync(pathImg + ext);
    res.status(400).json({ message: error?.original?.sqlMessage || error.message });
  }
};

const DeleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  if (!user) return res.status(400).json({ message: `User dengan id ${id} tidak ditemukan` });
  try {
    const pathImg = path.join(rootPath, "public/images/users", `${user.image_name}`);
    if (fs.existsSync(pathImg)) fs.unlinkSync(pathImg);

    await User.destroy({ where: { id } });
    res.status(200).json({ message: `Berhasil menghapus user id ${id}` });
  } catch (error) {
    res.status(400).json({ message: error?.original?.sqlMessage || error.message });
  }
};

const UpdateUser = async (req, res) => {
  const pathImg = req.file ? req.file.path : null;
  const ext = req.file ? path.extname(req.file.originalname) : null;
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(400).json({ message: `User dengan id ${id} tidak ditemukan` });

    const payload = req.body;
    if (!payload.name) return res.status(400).json({ message: "Semua field perlu diisi" });

    if (user.name !== payload.name) {
      const duplicate = await User.findOne({ where: { name: payload.name } });
      if (duplicate) return validationImage(res, pathImg, `Duplicate entry ${payload.name} for key 'name'`);
    }
    if (req.file) {
      const validExt = [".jpg", ".jpeg", ".png"];

      if (!validExt.includes(ext)) validationImage(res, pathImg, "Ekstensi tidak valid");
      if (req.file.size > 2000000) validationImage(res, pathImg, "Ukuran maksimal 2Mb");

      const newFilename = req.file.filename + ext;
      const pathOldImg = path.join(rootPath, "public/images/users", `${user.image_name}`);

      if (user.image_name && fs.existsSync(pathOldImg)) {
        fs.unlinkSync(pathOldImg);
        fs.renameSync(req.file.path, req.file.path + ext);
      } else {
        fs.renameSync(pathImg, pathImg + ext);
      }

      payload.image_name = newFilename;
      payload.image_url = `${req.protocol}://${req.get("host")}/images/users/${newFilename}`;
      await User.update(payload, { where: { id } });
      res.status(200).json({ message: `Berhasil mengubah user id ${id}` });
    } else {
      await User.update(req.body, { where: { id } });
      res.status(200).json({ message: `Berhasil mengubah user id ${id}` });
    }
  } catch (error) {
    if (fs.existsSync(pathImg + ext)) fs.unlinkSync(pathImg + ext);
    res.status(400).json({ message: error?.original?.sqlMessage || error.message });
  }
};

module.exports = { GetUsers, GetUserById, PostUser, DeleteUser, UpdateUser };
