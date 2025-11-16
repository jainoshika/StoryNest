const express = require("express");
const mongoose = require('mongoose');
require("dotenv").config();
const path = require('path');
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.static('public'));

//connections
const connectDB = require("./connections/db");
connectDB(process.env.MONGO_URI);

//model - blog
const blogModel = require("./models/blog");
const userModel = require("./models/user");

//views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares
const {checkForAuthentication, restrictTo} = require("./middlewares/auth");
const cookieParser = require('cookie-parser');
app.use(express.json()  );
app.use(express.urlencoded( {extended : false} ));
app.use(cookieParser());
app.use(checkForAuthentication);

//routes
app.get('/favicon.ico', (req, res) => res.status(204).end());
const blogRoutes = require("./routes/blog")
const userRoutes = require("./routes/user")
const publicRoutes = require("./routes/publicRoutes")
const staticRoutes = require("./routes/staticRoutes")

app.use("/blogs", restrictTo(['NORMAL']), blogRoutes);
app.use("/user", userRoutes);
app.use("/", publicRoutes);
app.use("/", staticRoutes);
app.use("/", userRoutes);

app.listen(PORT,  ()=> console.log(`Server started at PORT: ${PORT}. Listen for incoming HTTP requests`));