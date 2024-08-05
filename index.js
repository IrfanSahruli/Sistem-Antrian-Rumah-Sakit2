const express = require("express");
const cookieParser = require("cookie-parser");
const sequelize = require("./config/koneksi");
const admin = require("./model/admin");
const antrian = require("./model/antrian");
const kamar = require("./model/kamar");
const penyakit = require("./model/penyakit");
const loginRoutes = require("./routes/login");
const adminRoutes = require("./routes/admin");
const penyakitRoutes = require("./routes/penyakit");
const kamarRoutes = require("./routes/kamar");
const antrianRoutes = require("./routes/antrian");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/", loginRoutes);
app.use("/admin", adminRoutes);
app.use("/penyakit", penyakitRoutes);
app.use("/kamar", kamarRoutes);
app.use("/", antrianRoutes);

sequelize
  .authenticate()
  .then(async () => {
    console.log("Database berhasil konek");
    // await antrian.sync({ alter: true });
  })
  .catch((err) => console.log("Error: " + err));

app.listen(4000, () => {
  console.log("Server berhasil running di port 4000");
});
