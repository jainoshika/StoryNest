const jwt = require('jsonwebtoken');

//create token
function setUser(user) {
    return jwt.sign({ _id: user._id, role: user.role },
    process.env.JWT_SECRET);
}

//verify token received from user during each request
function  getUser(token){
    if (!token) return null;
    try {
        return jwt.verify(token, process.env.JWT_SECRET); // returns decoded payload
    }
    catch  {
        return null;
    } 
}

module.exports = {
    setUser, 
    getUser
}