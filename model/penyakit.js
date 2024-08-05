const { DataTypes } = require("sequelize");
const sequelize = require("../config/koneksi");

const Penyakit = sequelize.define(
  "penyakit",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama_penyakit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    harga_pengobatan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Penyakit;
