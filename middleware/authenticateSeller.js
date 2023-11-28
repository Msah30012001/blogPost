require("dotenv").config();
const jwt = require("jsonwebtoken");
const Seller = require("../models/sellerModel");
const { HTTPResponse401 } = require("../utils/responseMessage");

const authenticateSeller = async (req, res, next) => {
  try {
    const token = req.cookies.jwt || "";
    if (token) {
      // verify the jwt token
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // get seller data by jwt token
      const seller = await Seller.findOne({
        _id: verifyToken._id,
        "tokens.token": token,
      });

      if (!seller) {
        res
          .status(new HTTPResponse401().status)
          .send(
            new HTTPResponse401(
              "no authenticate credential is available. please authorized first"
            )
          );
      }

      req.token = token;
      req.sellerId = seller._id;
      req.seller = seller;

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

module.exports = authenticateSeller;
