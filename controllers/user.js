const { JsonWebTokenError } = require("jsonwebtoken");
const userModel = require("../models/user");
const {setUser, getUser} = require("../service/auth");
const blogModel = require("../models/blog");

async function handleUserSignup(req, res) {
    //data from form in request
    const { name, email, password } = req.body;
    await userModel.create({
        name, 
        email, 
        password
    })
    res.redirect("/login"); // i dont have a get for login, so render but lets see
}

async function handleUserLogin(req, res) {
    const {email, password} = req.body;
    const user = await userModel.findOne({email, password});
    if (!user) {
        res.render("login" , {
            error: "Invalid email or password"
        })
    } //give signup option too on login page
    const token = setUser(user);
    res.cookie("token", token);
    return res.redirect("/blogs");
}
async function handleViewUserBlogs(req, res) {
    //show all blogs created by user id
    const blogs = await blogModel.find({ createdBy: req.params.id });
    return res.render("userBlogs", {blogs, user : req.user});
}

module.exports = {
    handleUserLogin,
    handleUserSignup,
    handleViewUserBlogs
}