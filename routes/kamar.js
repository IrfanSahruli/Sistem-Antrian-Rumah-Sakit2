const express = require("express");
const router = express.Router();
const controller = require("../controller/kamar");
const auth = require("../middleware/verify_token");

router.post("/", auth, controller.dataKamar);
router.get("/", auth, controller.getAllKamar);
router.get("/:id", auth, controller.getByIdKamar);

module.exports = router;
