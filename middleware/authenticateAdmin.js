require("dotenv").config();
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
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

      if (!admin) {
        res
          .status(new HTTPResponse401().status)
          .send(
            new HTTPResponse401(
              "no authenticate credential is available. please authorized first"
            )
          );
      }

      req.token = token;
      req.adminId = admin._id;
      req.admin = admin;

      next();
    } else {
      res
        .status(new HTTPResponse401().status)
        .send(
          new HTTPResponse401(
            "no authenticate credential is available. please authorized first"
          )
        );
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticateAdmin;
