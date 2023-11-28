const jwt = require("jsonwebtoken");
const {
  HTTPResponse200,
  HTTPResponse201,
  HTTPResponse202,
  HTTPResponse400,
  HTTPResponse401,
  HTTPResponse404,
  HTTPResponse406,
  HTTPResponse409,
} = require("../utils/responseMessage");
const Admin = require("../models/adminModel");

const register = async (req, res, next) => {
  try {
    // check admin is exist or not
    const adminData = await Admin.find({});

    if (adminData.length) {
      return res
        .status(new HTTPResponse406().status)
        .send(
          new HTTPResponse406(
            "admin is already exist. no further registration"
          )
        );
    }
    // admin not exist then create a new admin
    const admin = new Admin(req.body);
    const createAdmin = await admin.save();

    res
      .status(new HTTPResponse201().status)
      .send(
        new HTTPResponse201("admin register successfully !!!", createAdmin)
      );
  } catch (error) {
    next(error);
  }
};

const getAdmin = async (req, res, next) => {
  try {
    // check admin is authorized
    if (req.type != "admin") {
      return res
        .status(new HTTPResponse401().status)
        .send(new HTTPResponse401("un authorized access"));
    }
    const adminData = await Admin.find();
    if (!adminData.length) {
      return res
        .status(new HTTPResponse404().status)
        .send(new HTTPResponse404("admin data not exist !!!"));
    }
    res
      .status(new HTTPResponse200().status)
      .send(
        new HTTPResponse200("admin data fetched successfully !!!", adminData)
      );
  } catch (error) {
    next(error);
  }
};

const authAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check admin is exist or not
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res
        .status(new HTTPResponse401().status)
        .send(new HTTPResponse401("Invalid Authentication Credentials"));
    }

    // check admin password is valid or not
    const checkPassword = await admin.isValidPassword(password);
    if (!checkPassword) {
      return res
        .status(new HTTPResponse401().status)
        .send(new HTTPResponse401("Invalid Authentication Credentials"));
    }

    // update status admin
    await Admin.updateOne({ email: email }, { $set: { status: "online" } });

    // generate jwt token
    const token = await admin.generateAuthToken();
    res.cookie("jwt", token, {
      //cookie expires in 7 days
      expires: new Date(Date.now() + 604800000),
      httpOnly: true,
    });
    res
      .status(new HTTPResponse200().status)
      .send(new HTTPResponse200("Admin login successfully"));
  } catch (error) {
    next(error);
  }
};


const destroyAuthAdmin = async (req, res, next) => {
  try {
    // check admin is authorized
    if (req.type != "admin") {
      return res
        .status(new HTTPResponse401().status)
        .send(new HTTPResponse401("un authorized access"));
    }
    const admin = await Admin.findOne({ _id: req.adminId });
    admin.tokens = admin.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await admin.save();
    await Admin.findByIdAndUpdate(
      { _id: req.adminId },
      { $set: { status: "offline" } }
    );
    res.clearCookie("jwt", { httpOnly: true });
    res
      .status(new HTTPResponse200().status)
      .send(new HTTPResponse200("Admin logout successfully"));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  getAdmin,
  authAdmin,
  destroyAuthAdmin,
};
