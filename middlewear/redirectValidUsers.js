const jwt = require('jsonwebtoken');
const { accessCheck } = require('../controllers/userControllers/accessTokenCheck.js')
const { refreshCheck } = require('../controllers/userControllers/refreshTokenCheck.js')
const User = require("../models/User.js")


// this middlewear detects users with valid tokens, and redirects them away from "/signIn" and "/signUp"
async function redirectValidTokens(req, res, next) {
    req.validation = await accessCheck(req)
    console.log(`Validation check after access check: ${req.validation}`)
    // if user passes the accessCheck, redirect to user's profile
    if(req.validation === true){
        console.log(`Verification successful, redirecting token to ${req.user.username} profile.`)
        const user = await User.findOne({username : req.user.username});
        req.user.id = user._id;
        console.log(`Found user by id: ${req.user.id}`)
        res.redirect("profile")
    }
    else {
        // otherwise, check for refreshToken
         req.validation = await refreshCheck(req)

        // if user passes refreshCheck, create a new access token for the user, and move on
        if(req.validation === true){
            console.log("Refresh validation success. Creating new access token and redirecting to user's profile.")
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
            res.redirect("profile")
        } // if user doesn't pass check, continue as planned
        else {
            console.log("Calling next()")
            next();
        }
    }
}

module.exports = { redirectValidTokens }