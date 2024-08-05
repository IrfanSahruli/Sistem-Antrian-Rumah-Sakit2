const { Op, where } = require("sequelize");
const Penyakit = require("../model/penyakit");

const dataPenyakit = async (req, res) => {
  const { nama_penyakit, harga_pengobatan } = req.body;

  try {
    const penyakit = await Penyakit.create({
      nama_penyakit,
      harga_pengobatan,
    });

    res.status(201).json({
      message: "Penyakit berhasil ditambahkan",
      data_penyakit: penyakit,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const getAllPenyakit = async (req, res) => {
  try {
    const penyakit = await Penyakit.findAll();
    res.status(200).json({
      message: "Data Penyakit",
      penyakit,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getByIdPenyakit = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const penyakit = await Penyakit.findByPk(id);
    if (penyakit) {
      res.json(penyakit);
    } else {
      res.status(4004).json({
        message: "Data penyakit tidak ditemukan",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  dataPenyakit,
  getAllPenyakit,
  getByIdPenyakit,
};
