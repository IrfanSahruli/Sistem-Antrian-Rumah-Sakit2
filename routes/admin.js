const express = require("express");
const router = express.Router();
const controller = require("../controller/admin");
const auth = require("../middleware/verify_token");

router.post("/", controller.createAdmin);
router.get("/", auth, controller.getAllAdmin);
router.get("/:id", auth, controller.getByIdAdmin);

module.exports = router;
