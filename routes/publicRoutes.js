const express = require("express");
const router = express.Router();
const {handleAllBlogs} = require("../controllers/blog");

router
    .get("/", handleAllBlogs)

module.exports = router;