const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../model/admin");
const { patch } = require("../routes/login");

const SECRET_KEY = "irfan266";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari pengguna berdasarkan email
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    // Verifikasi kata sandi
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Kata sandi salah" });
    }

    // Buat token JWT
    const token = jwt.sign(
      { adminId: admin.id, email: admin.email },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    // Set token dalam cookies
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // hanya kirim cookie melalui HTTPS di produksi
      maxAge: 3600000, // 1 jam dalam milidetik
      patch: "/",
    });

    // Kembalikan respons dengan pesan sukses
    res.json({
      message: "Login berhasil",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("authToken", { httpOnly: true });
    res.status(200).json({ message: "Log out berhasil" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
  logout,
};
