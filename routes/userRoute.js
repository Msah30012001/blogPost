const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  register,
  getAdmin,
  authAdmin,
  destroyAuthAdmin,
} = require("../controllers/userController");

router.route("/").post(register);
router.route("/login").post(authAdmin);
router.route("/logout").get(auth, destroyAuthAdmin);
router.route("/").get(auth, getAdmin);

module.exports = router;
