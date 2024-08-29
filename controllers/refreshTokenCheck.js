const jwt = require('jsonwebtoken');
const User = require('../models/User.js')

async function refreshCheck(req) {
    req.validation = false;
    let refreshToken;

    if (req.cookies?.refreshToken) {
        refreshToken = req.cookies.refreshToken;
    } else {
        console.log("No refresh token found.");
        return;
    }

    const foundUser = await User.findOne({ refreshToken: refreshToken });

    if (!foundUser) {
        console.log("No user in the db found with that refresh token. Validation failed.");
        return;
    }

    console.log("User in db with refresh token found. Attempting to verify refresh token...");

    try {
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err, decoded) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(decoded);
                }
            );
        });

        if (decoded.username !== foundUser.username) {
            console.log("Incorrect username for matching refresh token.");
            return;
        }

        foundUser.refreshToken = refreshToken;
        await foundUser.save();
        req.validation = true;
        req.user = decoded.username;
        return true;

    } catch (err) {
        if (err.message === "jwt expired") {
        } else {
            console.log(`Error, refreshTokenCheck.js: JWT verification error: ${err.message}`);
        }
        return;
    }
}

module.exports = { refreshCheck };