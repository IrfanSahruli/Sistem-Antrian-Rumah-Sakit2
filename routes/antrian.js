const express = require("express");
const router = express.Router();
const controller = require("../controller/antrian");
const auth = require("../middleware/verify_token");

router.post("/antrian", auth, controller.inputAntrian);
router.put("/periksa/:id", auth, controller.inputPeriksa);
router.put("/bayar/:id", auth, controller.inputBayar);

module.exports = router;
