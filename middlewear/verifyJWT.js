const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    token = req.cookies.accessToken
    console.log(`Verifying jwt; Access Token is: ${token}`)
    
    if(!token){return res.sendStatus(401)}

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err){
                // res.sendStatus(403)
                console.log(err.message)
                res.status(403).redirect('/signIn')
            } else {
                req.user = decoded.username
                console.log(decoded)
                next()
            }
        }
    )
    
}

module.exports = verifyJWT