//These are files physically stored in your project that Express serves directly.const express = require("express"); Static files do NOT use controllers.
const express = require('express')  ;
const router = express.Router();

router
    .get("/login", (req, res) => {
        return res.render("login")
    })
    .get("/signup", (req, res) => {
        return res.render("signup")
    })

module.exports = router;