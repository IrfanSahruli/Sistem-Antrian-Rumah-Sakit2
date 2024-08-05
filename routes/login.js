const express = require("express");
const router = express.Router();
const controller = require("../controller/login");
const verifyToken = require("../middleware/verify_token");

router.post("/login", controller.login);
router.delete("/logout", controller.logout);

router.get("/", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.admin });
});

module.exports = router;
