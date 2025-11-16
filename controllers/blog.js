const blogModel = require("../models/blog");
const userModel = require("../models/user");

//read blogs anybody's blog
async function handleViewBlog(req, res) {
    const blog = await blogModel.findById(req.params.id).populate("comments.user", "name"); //blog id
    //req.user => user
   res.render("blog", {
    blog: blog,
    user: req.user
});
}

//public routes - read
async function handleAllBlogs(req, res) {
    try{
        const blogs = await blogModel.find();
        console.log(req.user._id);
        res.render("home", {blogs, user : req.user}); //shows all blogs
    }
    catch(err) {
        console.error("Error fetching blogs:", err);
        res.status(500).send("Error fetching blogs");//server errors
    }
}

// create my blog
async function handleCreateNewBlog (req, res){
    console.log(req.body);
    await blogModel.create({
        title : req.body.title,
        content: req.body.content,
        author : req.body.author,
        date: req.body.date,
        createdBy: req.user._id,
    })
    return res.redirect("/blogs");
}

//delete my blog - .post("/delete/blog-id")
async function handleDeleteBlog(req, res) {
    await blogModel.findByIdAndDelete(req.params.id);
    res.redirect(`/user/${req.user._id}`);
}

//edit and update my blog
async function handleEditBlog(req, res) {
    const blog = await blogModel.findById(req.params.id);
    res.render("edit", { blog });
}

async function handleUpdateBlog(req, res) {
    const { title, content, author } =req.body;
    await blogModel.findByIdAndUpdate(req.params.id, {
        title,
        content,
        author,
    });
    res.redirect(`/blogs/${req.params.id}`);
}

async function handleBlogLike(req, res) {
    if (!req.user) return res.redirect("/login");
    const blog = await blogModel.findById(req.params.id);
     const userId = req.user._id.toString();

    const index = blog.likes.findIndex(id => id.toString() === userId);

    if (index === -1) {
        // Like
        blog.likes.push(req.user._id);
    } else {
        // Unlike
        blog.likes.splice(index, 1);
    }

    await blog.save();

    res.redirect(`/blogs/${req.params.id}`);
}

async function handleBlogComments(req, res) {
    if (!req.user) return res.redirect("/login");
    const blog = await blogModel
                                .findById(req.params.id);
                                
    blog.comments.push({
        user: req.user._id,
        text: req.body.text
    });
    await blog.save();
    res.redirect(`/blogs/${req.params.id}`);
}

async function handleSearchBlog(req, res) {
    const query = req.query.q;
    const blogs = await blogModel.find({
        $or: [
            { title: { $regex: query, $options: "i" }},
            { content: { $regex: query, $options: "i" }},
        ]
    });
    res.render("searchBlogs", { blogs, query, user: req.user });
}

module.exports = {
    handleCreateNewBlog,
    handleAllBlogs,
    handleDeleteBlog,
    handleEditBlog,
    handleViewBlog,
    handleUpdateBlog,
    handleBlogLike,
    handleBlogComments,
    handleSearchBlog
}