const jwt = require('jsonwebtoken');
exports.auth = async (req, res, next) => {
    try {
        const token = req.headers["authtoken"]
        if(!token){
            return res.send("err token")
        }
        const decode = jwt.verify(token, "mosnajaaa")
        console.log(decode)

        next();
    } catch(err) {
        res.send("Token invalid")
    }
}