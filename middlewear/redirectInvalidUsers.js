const jwt = require('jsonwebtoken');
const { accessCheck } = require('../controllers/accessTokenCheck')
const { refreshCheck } = require('../controllers/refreshTokenCheck')


// this middlewear is to protect unvalidated users from accessing protected routes
async function redirectInvalidTokens(req, res, next) {
    req.validation = false;
    await accessCheck(req);
    // if user passes the accessCheck, continue as planned
    if(req.validation === true){
        console.log("Validation successful. Calling next()")
        next();
    }
    // otherwise, check for refreshToken
    else {
        await refreshCheck(req)
        // if user passes refreshCheck, create a new access token for the user, and move on
        if(req.validation === true){
            console.log("Refresh check passed, generating an access token and allowing user to pass.")
            const accessToken = jwt.sign(
                {"username" : req.username, },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn : 1000 * 60 * 60 * 2} // 2 hours
            )

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
                maxAge: 2 * 60 * 60 * 1000, // 2 hours
            });
            next();
        } // if user doesn't pass check, redirect to /signIn
        else {
            console.log("Redirecting to sign in.)")
            res.redirect("/signIn")
        }
    }
}

module.exports = { redirectInvalidTokens }