const express = require("express");
const router = express.Router();
const {handleCreateNewBlog, handleAllBlogs, handleDeleteBlog, handleEditBlog, handleViewBlog, 
    handleUpdateBlog, handleBlogComments, handleBlogLike, handleSearchBlog} = require("../controllers/blog");

router
    .get("/new", (req,res) => { // opens new blog page
        res.render("newblog");
    })
    .get("/search", handleSearchBlog)
    .post("/new", handleCreateNewBlog)
    .post("/like/:id", handleBlogLike)
    .post("/comment/:id", handleBlogComments)
    .get("/edit/:id", handleEditBlog)
    .post("/edit/:id", handleUpdateBlog)
    .post("/delete/:id", handleDeleteBlog)
    .get("/", handleAllBlogs)
    .get("/:id", handleViewBlog)
    



module.exports = router;