const { Op, where } = require("sequelize");
const bcrypt = require("bcryptjs");
const Admin = require("../model/admin");

const createAdmin = async (req, res) => {
  const { nama, email, password } = req.body;

  try {
    // Cek apakah pengguna dengan email tersebut sudah terdaftar
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Hash password sebelum disimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan pengguna ke dalam database
    const newAdmin = await Admin.create({
      nama,
      email,
      password: hashedPassword,
    });

    // Kembalikan respons
    res.status(201).json({
      message: "Registrasi berhasil",
      data_admin: newAdmin,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllAdmin = async (req, res) => {
  try {
    const admin = await Admin.findAll();
    res.json(admin);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getByIdAdmin = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const admin = await Admin.findByPk(id);
    if (admin) {
      res.json(admin);
    } else {
      res.status(4004).json({
        message: "tidak ditemukan",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createAdmin,
  getAllAdmin,
  getByIdAdmin,
};
