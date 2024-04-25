const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.js");
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization
    const word = token.split(" ")
    const jwtToken = word[1]

    try {
        const decodedData = jwt.verify(jwtToken, JWT_SECRET)
        if (decodedData.username) {
            next();
        } else {
            res.status(403).json({
                message: "You are not authenticated"
            })
        }
    } catch (e) {
        res.json({
            msg: "Invalid Inputs"
        })
    }
}

module.exports = adminMiddleware;