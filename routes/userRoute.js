const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  register,
  getAdmin,
  authAdmin,
  destroyAuthAdmin,
} = require("../controllers/adminController");

router.route("/").post(register);
router.route("/auth").post(authAdmin);
router.route("/destroy-auth").get(auth, destroyAuthAdmin);
router.route("/").get(auth, getAdmin);

module.exports = router;
