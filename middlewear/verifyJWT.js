const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    authHeader = request.headers['authorization']

    if(!authHeader){res.sendStatus(401)}

    const token = authHeader.split('')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err){
                return res.sendStatus(403);
            } else {
                req.user = decoded.username
                next()
            }
        }
    )
    
}