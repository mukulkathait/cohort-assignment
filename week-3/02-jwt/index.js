const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const z = require("zod")
const jwtDecode = require("jwt-decode")

const usernameSchema = z.string().email()
const passwordSchema = z.string().length(6)

function signJwt(username, password) {
    const verifyUsername = usernameSchema.safeParse(username)
    const verifyPassword = passwordSchema.safeParse(password)

    if (!(verifyUsername.success && verifyPassword.success)) {
        return null;
    }

    return jwt.sign({ "username": username }, jwtPassword)
}

function verifyJwt(token) {
    try {
        jwt.verify(token, jwtPassword)
    } catch (error) {
        return false;
    }
    return true;
}

function decodeJwt(token) {
    const decodedData = jwt.decode(token)
    return (decodedData) ? true : false
}

// function main() {
//     const token = signJwt("kathaitmukul0699@gmail.com", '123456')
//     const valid = verifyJwt(token)
//     const decode = decodeJwt(token)
//     console.log(`Token : ${token}  Typeof : ${typeof (token)}`)
//     console.log(`Valid : ${valid}  Typeof : ${typeof (valid)}`)
//     console.log(`Decoded : ${decode}  Typeof : ${typeof (decode)}`)
// }

// main()


module.exports = {
    signJwt,
    verifyJwt,
    decodeJwt,
    jwtPassword,
};
