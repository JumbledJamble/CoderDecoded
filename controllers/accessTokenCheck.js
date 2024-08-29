const jwt = require('jsonwebtoken');

async function accessCheck(req){
    req.validation = false
    let accessToken;
    if(req.cookies?.accessToken){
        accessToken = req.cookies.accessToken
    } else {
        console.log("No access token found");
        return;
    }

    console.log("Attempting to verify access token...")
    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err){
                if(err.message === "jwt expired"){
                } else{console.log(`Access check failed: JWT verification error: ${err.message}`)}
                return;
            }
            req.validation = true;
            req.user = decoded.username;
            console.log(`Access check passed. User: ${req.user}`)
            return;
        }
    )
}


module.exports = { accessCheck }