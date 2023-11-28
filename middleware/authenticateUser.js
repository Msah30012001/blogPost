require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { HTTPResponse401 } = require("../utils/responseMessage");

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt || "";
    if (token) {
      // verify the jwt token
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // get user data by jwt token
      const user = await User.findOne({
        _id: verifyToken._id,
        "tokens.token": token,
      });

      if (!user) {
        res
          .status(new HTTPResponse401().status)
          .send(
            new HTTPResponse401(
              "no authenticate credential is available. please authorized first"
            )
          );
      }

      req.token = token;
      req.userId = user._id;
      req.user = user;

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

module.exports = authenticateUser;
