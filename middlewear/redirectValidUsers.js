const jwt = require('jsonwebtoken');
const { accessCheck } = require('../controllers/accessTokenCheck.js')
const { refreshCheck } = require('../controllers/refreshTokenCheck.js')


// this middlewear detects users with valid tokens, and redirects them away from "/signIn" and "/signUp"
async function redirectValidTokens(req, res, next) {
    req.validation = false;
    await accessCheck(req)

    // if user passes the accessCheck, redirect to user's profile
    if(req.validation === true){
        console.log(`Verification successful, redirecting to ${req.user} profile.`)
        res.redirect("/ownProfile")
    }
    else {
        // otherwise, check for refreshToken
        await refreshCheck(req)

        // if user passes refreshCheck, create a new access token for the user, and move on
        if(req.validation === true){
            console.log("Refresh validation success. Creating new access token and redirecting to user's profile.")
            const accessToken = jwt.sign(
                {"username" : req.username, },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn : 1000 * 60 * 60 * 2}
            )

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
                maxAge: 2 * 60 * 60 * 1000,
            });
            res.redirect("/ownProfile")
        } // if user doesn't pass check, continue as planned
        else {
            console.log("Calling next()")
            next();
        }
    }
}

module.exports = { redirectValidTokens }