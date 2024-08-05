const { DataTypes } = require("sequelize");
const sequelize = require("../config/koneksi");
const Admin = require("./admin");
const Kamar = require("./kamar");
const Penyakit = require("./penyakit");

const Antrian = sequelize.define(
  "antrian",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Admin,
        key: "id",
      },
    },
    nama_pasien: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    no_antrian: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    jam_batas_waktu_pembayaran: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    jam_pembayaran: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    id_kamar: {
      type: DataTypes.INTEGER,
      allowNull: true, // Ubah dari false menjadi true
      references: {
        model: Kamar,
        key: "id",
      },
    },
    id_penyakit: {
      type: DataTypes.INTEGER,
      allowNull: true, // Ubah dari false menjadi true
      references: {
        model: Penyakit,
        key: "id",
      },
    },
    harga_denda_perjam: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 50000,
    },
    total_denda: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sub_total: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    foto_pembayaran: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["antrian", "periksa", "bayar"],
      allowNull: false,
      defaultValue: "antrian",
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Definisi relasi
Antrian.belongsTo(Admin, { foreignKey: "id_admin" });
Admin.hasMany(Antrian, { foreignKey: "id_admin" });

Antrian.belongsTo(Kamar, { foreignKey: "id_kamar" });
Kamar.hasMany(Antrian, { foreignKey: "id_kamar" });

Antrian.belongsTo(Penyakit, { foreignKey: "id_penyakit" });
Penyakit.hasMany(Antrian, { foreignKey: "id_penyakit" });

module.exports = Antrian;
