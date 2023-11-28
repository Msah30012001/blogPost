require("dotenv").config();
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const Seller = require("../models/sellerModel");
const User = require("../models/userModel");
const { HTTPResponse401 } = require("../utils/responseMessage");

const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.jwt || "";
    if (token) {
      // verify the jwt token
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // get admin data by jwt token
      const admin = await Admin.findOne({
        _id: verifyToken._id,
        "tokens.token": token,
      });

      // get seller data by jwt token
      const seller = await Seller.findOne({
        _id: verifyToken._id,
        "tokens.token": token,
      });

      // get user data by jwt token
      const user = await User.findOne({
        _id: verifyToken._id,
        "tokens.token": token,
      });

      // check if any one not exist then
      if (!admin && !seller && !user) {
        res
          .status(new HTTPResponse401().status)
          .send(
            new HTTPResponse401(
              "no authenticate credential is available. please authorized first"
            )
          );
      }

      if (admin) {
        req.token = token;
        req.type = "admin";
        req.adminId = admin._id;
        req.admin = admin;
      }

      if (seller) {
        req.token = token;
        req.type = "seller";
        req.sellerId = seller._id;
        req.seller = seller;
      }

      if (user) {
        req.token = token;
        req.type = "user";
        req.userId = user._id;
        req.user = user;
      }

    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticateAdmin;
