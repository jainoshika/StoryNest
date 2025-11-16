const jwt = require('jsonwebtoken');
const secret = "qwerty123";

//create token
function setUser(user) {
    return jwt.sign({ _id: user._id, role: user.role },
     secret);
}

//verify token received from user during each request
function  getUser(token){
    if (!token) return null;
    try {
        return jwt.verify(token, secret); // returns decoded payload
    }
    catch  {
        return null;
    } 
}

module.exports = {
    setUser, 
    getUser
}