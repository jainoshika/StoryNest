const {getUser} = require("../service/auth");

//middleware
function checkForAuthentication(req, res, next) { //request/ cookies from frontend -> has id in it of user 
    const token = req.cookies?.token;
    req.user = null //avoids data leakage and undefined issue
    if (!token) return next();
    const user = getUser(token);
    req.user = user
    next();
}

function restrictTo(roles = []){
    return function(req, res, next) {
        if (!req.user) return res.redirect('/login');
        if (!roles.includes(req.user.role)) return res.end("unauthorised")
        return next(); 
    }    
}

module.exports = {
    checkForAuthentication,
    restrictTo
}