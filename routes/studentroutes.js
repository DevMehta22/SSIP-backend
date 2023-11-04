const express = require("express");
const { signupStd,loginStd } = require("../controllers/studentcontrollers");

const router = express.Router();

router.post("/login", loginStd);
router.post("/signup", signupStd);

module.exports = router;