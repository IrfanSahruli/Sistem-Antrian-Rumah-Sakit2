const express = require("express");
const router = express.Router();
const controller = require("../controller/penyakit");
const auth = require("../middleware/verify_token");

router.post("/", auth, controller.dataPenyakit);
router.get("/", auth, controller.getAllPenyakit);
router.get("/:id", auth, controller.getByIdPenyakit);

module.exports = router;
