const { JWT_SECRET } = require("../config/config.js")
const jwt = require("jsonwebtoken")

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization
    const word = token.split(" ")
    const jwtToken = word[1]
    const decodedData = jwt.verify(jwtToken, JWT_SECRET)

    try {
        if (decodedData.username) {
            req.body.username = decodedData.username
            next()
        } else {
            res.status(403).json({
                message: "You are not authenticated"
            })
        }
    } catch (error) {
        res.json({
            msg: "Invalid Inputs"
        })
    }
}

module.exports = userMiddleware;