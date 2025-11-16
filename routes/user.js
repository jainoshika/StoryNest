const express = require("express");
const router = express.Router();
const { handleUserSignup, handleUserLogin, handleViewUserBlogs } = require("../controllers/user");
const {restrictTo}  = require("../middlewares/auth")
router
      .post("/signup", handleUserSignup)
      .post("/login", handleUserLogin)
      .get("/:id", restrictTo(['NORMAL']), handleViewUserBlogs)
module.exports = router;