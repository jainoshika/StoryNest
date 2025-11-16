const express = require("express");
const router = express.Router();
const {handleCreateNewBlog, handleAllBlogs, handleDeleteBlog, handleEditBlog, handleViewBlog, 
    handleUpdateBlog, handleBlogComments, handleBlogLike, handleSearchBlog} = require("../controllers/blog");

router
    .get("/", handleAllBlogs)
    .get("/new", restrictTo(['NORMAL']), (req,res) => { // opens new blog page
        res.render("newblog");
    })
    .get("/search", handleSearchBlog)
    .post("/new", restrictTo(['NORMAL']),handleCreateNewBlog)
    .post("/like/:id",restrictTo(['NORMAL']),  handleBlogLike)
    .post("/comment/:id", restrictTo(['NORMAL']), handleBlogComments)
    .get("/edit/:id", handleEditBlog)
    .post("/edit/:id", restrictTo(['NORMAL']), handleUpdateBlog)
    .post("/delete/:id", restrictTo(['NORMAL']), handleDeleteBlog)
    .get("/:id", handleViewBlog)
    



module.exports = router;