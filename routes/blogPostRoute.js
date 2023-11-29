const express = require("express");
const router = express.Router();

const {
  createBlogPost,
  readBlogPost,
  showBlogPost,
  updateBlogPost,
  destroyBlogPost,
} = require("../controllers/blogPostController");

router.route("/").post(createBlogPost);
router.route("/").get(readBlogPost);
router.route("/:id").get(showBlogPost);
router.route("/:id").patch(updateBlogPost);
router.route("/:id").delete(destroyBlogPost);

module.exports = router;
