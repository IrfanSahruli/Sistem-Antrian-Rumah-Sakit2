const { DataTypes } = require("sequelize");
const sequelize = require("../config/koneksi");

const Kamar = sequelize.define(
  "kamar",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama_kamar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_kamar: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    harga_kamar: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Kamar;
