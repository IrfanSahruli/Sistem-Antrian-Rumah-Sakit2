const { DataTypes } = require("sequelize");
const multer = require("multer");
const path = require("path");
const Antrian = require("../model/antrian");
const Kamar = require("../model/kamar");
const Penyakit = require("../model/penyakit");
const Admin = require("../model/admin");

// Konfigurasi multer untuk mengunggah file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Direktori penyimpanan
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Nama file
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("File tidak diizinkan"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Fungsi utilitas untuk mengonversi string waktu ke objek Date
function parseTimeToDate(timeString) {
  if (!timeString) return new Date();
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours || 0, minutes || 0, 0, 0);
  return date;
}

// Fungsi untuk input antrian
const inputAntrian = async (req, res) => {
  const { nama_pasien, no_antrian } = req.body;

  try {
    const id_admin = req.admin.adminId;

    const newAntrian = await Antrian.create({
      id_admin,
      nama_pasien,
      no_antrian,
      status: "antrian",
    });

    res.status(201).json(newAntrian);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

// Fungsi untuk input periksa
const inputPeriksa = async (req, res) => {
  const { id } = req.params;
  const { id_penyakit, jam_batas_waktu_pembayaran } = req.body;

  try {
    const antrian = await Antrian.findByPk(id);
    if (!antrian) {
      return res.status(404).json({ error: "Antrian tidak ditemukan" });
    }

    const penyakit = await Penyakit.findByPk(id_penyakit);
    if (!penyakit) {
      return res.status(404).json({ error: "Penyakit tidak ditemukan" });
    }

    antrian.id_penyakit = id_penyakit;
    antrian.jam_batas_waktu_pembayaran = jam_batas_waktu_pembayaran;
    antrian.status = "periksa";

    await antrian.save();

    res.status(200).json(antrian);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

// Fungsi untuk input bayar
const inputBayar = async (req, res) => {
  upload.single("foto_pembayaran")(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { id } = req.params;
    const { id_kamar, jam_pembayaran } = req.body;

    try {
      // Mengambil data antrian beserta relasi penyakit
      const antrian = await Antrian.findByPk(id, {
        include: [Penyakit], // Memuat relasi Penyakit
      });

      if (!antrian) {
        return res.status(404).json({ error: "Antrian tidak ditemukan" });
      }

      const kamar = await Kamar.findByPk(id_kamar);
      if (!kamar) {
        return res.status(404).json({ error: "Kamar tidak ditemukan" });
      }

      // Pastikan harga_kamar ada dan dapat di-parse
      const hargaKamar = parseFloat(kamar.harga_kamar) || 0;

      // Pastikan antrian.Penyakit ada sebelum mengaksesnya
      const hargaPengobatan = antrian.Penyakit
        ? parseFloat(antrian.Penyakit.harga_pengobatan) || 0
        : 0;

      const harga_denda_perjam = antrian.harga_denda_perjam || 50000;

      // Gunakan fungsi utilitas untuk mengonversi jam
      const jamBatasWaktu = parseTimeToDate(antrian.jam_batas_waktu_pembayaran);
      const jamPembayaran = parseTimeToDate(jam_pembayaran);

      // Hitung selisih jam
      const selisihJam = Math.max(
        0,
        (jamPembayaran - jamBatasWaktu) / (1000 * 60 * 60)
      );

      const total_denda = harga_denda_perjam * selisihJam;
      const sub_total = hargaKamar + hargaPengobatan + total_denda;
      const foto_pembayaran_url = req.file
        ? `/uploads/${req.file.filename}`
        : null;

      antrian.id_kamar = id_kamar;
      antrian.jam_pembayaran = jamPembayaran;
      antrian.total_denda = total_denda;
      antrian.sub_total = sub_total;
      antrian.foto_pembayaran = foto_pembayaran_url;
      antrian.status = "bayar";

      await antrian.save();

      res.status(200).json(antrian);
    } catch (error) {
      console.error("Error occurred:", error);
      res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
  });
};

module.exports = {
  inputAntrian,
  inputPeriksa,
  inputBayar,
};
