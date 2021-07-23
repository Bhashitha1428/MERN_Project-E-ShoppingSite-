const jwt = require('jsonwebtoken')

exports.requireSignin = (req, res, next) => {

    if (req.headers.authorization) {

        const token = req.headers.authorization.split(" ")[1];
        try {
            // if(!token) return res.status(400).json({msg:"Authorization failed"})
            const user = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
            req.user = user
            next()

        } catch (err) {
            return res.status(400).json({ msg: "Invalid token" })
        }

    }
    else return res.status(400).json({ msg: "Authorization failed" })


}

exports.checkAdminUser = (req, res, next) => {

    if (!req.user.role == 'admin') {
        return res.status(400).json({ msg: 'Access denied u are not authorized user' })
    }
    next()

}

exports.checkUser = (req, res, next) => {

    if (!req.user.role == 'user') {
        return res.status(400).json({ msg: 'Access denied u are not authorized user' })
    }
    next()

}

