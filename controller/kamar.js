const { Op, where } = require("sequelize");
const Kamar = require("../model/kamar");

const dataKamar = async (req, res) => {
  const { nama_kamar, no_kamar, harga_kamar } = req.body;

  try {
    const kamar = await Kamar.create({
      nama_kamar,
      no_kamar,
      harga_kamar,
    });

    res.status(201).json({
      message: "Kamar berhasil ditambahkan",
      data_kamar: kamar,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const getAllKamar = async (req, res) => {
  try {
    const kamar = await Kamar.findAll();
    res.json(kamar);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getByIdKamar = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const kamar = await Kamar.findByPk(id);
    if (kamar) {
      res.json(kamar);
    } else {
      res.status(4004).json({
        message: "Data kamar tidak ditemukan",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  dataKamar,
  getAllKamar,
  getByIdKamar,
};
