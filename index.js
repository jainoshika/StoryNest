const express = require("express");
const app = express();
const path = require('path');
const PORT = 8000;
const blogModel = require("./models/blog");
const userModel = require("./models/user");
const cookieParser = require('cookie-parser');
const {checkForAuthentication, restrictTo} = require("./middlewares/auth");
app.use(express.static('public'));

//connections
const connectDB = require("./connections/db");
connectDB("mongodb://127.0.0.1:27017/blog-app");

//model - blog

//views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


//routes
const blogRoutes = require("./routes/blog")
const userRoutes = require("./routes/user")
const publicRoutes = require("./routes/publicRoutes")
const staticRoutes = require("./routes/staticRoutes")

//middlewares
app.use(express.json()  );
app.use(express.urlencoded( {extended : false} ));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/blogs", restrictTo(['NORMAL']), blogRoutes);
app.use("/user", userRoutes);
app.use("/", publicRoutes);
app.use("/", staticRoutes);
app.use("/", userRoutes);

app.listen(PORT,  ()=> console.log(`Server started at PORT: ${PORT}. Listen for incoming HTTP requests`));