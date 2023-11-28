require("dotenv").config();
const multer = require("multer");
const path = require("path");
const { HTTPResponse406 } = require("../utils/responseMessage");

const multerConf = {
  storage: multer.diskStorage({
    destination: (req, file, next) => {
      next(null, path.resolve(process.env.UPLOAD_PATH ?? "./public/upload"));
    },
    filename: (req, file, next) => {
      const ext = path.extname(file.originalname);
      const newName = `${file.fieldname}_${Date.now()}_${Math.round(
        Math.random() * 1e9
      )}${ext}`;
      next(null, newName);
    },
  }),
  limits: 10,
  fileFilter: (req, file, next) => {
    if (!file) {
      next();
    }
    const image = file.mimetype.startsWith("image/");
    if (image) {
      next(null, true);
    } else {
      next(new HTTPResponse406("file not support"), false);
    }
  },
};

module.exports = multerConf;
