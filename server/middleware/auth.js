const passport = require('passport');
const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        token = token.split(" ")[1].trim();
        const decode = await jwt.verify(token, 'SECRET');
        req.user = decode;
        console.log("req user", req.user);
        next();
    }
    catch (e) {
        // console.log(e);
        res.status(401).json({ "message": "Authorization failed" });
    }
}

module.exports = auth;
