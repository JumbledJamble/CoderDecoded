const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const accessCheck = async (req) => {
    let accessToken;
    if (req.cookies?.accessToken) {
        accessToken = req.cookies.accessToken;
    } else {
        console.log("No access token found");
        return false;
    }

    console.log("Attempting to verify access token...");
    try {
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(
                accessToken,
                process.env.ACCESS_TOKEN_SECRET,
                (err, decoded) => {
                    if (err) {
                        if (err.message === "jwt expired") {
                            console.log("JWT expired");
                        } else {
                            console.log(`Access check failed: JWT verification error: ${err.message}`);
                        }
                        return reject(err); // Reject on error
                    }
                    resolve(decoded); // Resolve with decoded data
                }
            );
        });
        console.log(`from accessTokenCheck --> Decoded:`)
        console.log(decoded)
        const signingUser = await User.findOne({ username: decoded.username }).exec();

        if (!signingUser) {
            console.log("User not found");
            return false;
        }
        // ensure this format matches profileRoutes input to render profile
        req.user = { username : decoded.username, _id : signingUser._id.toString()}
        console.log(req.user)
        return true; // Return true if successful
    } catch (error) {
        console.log(`Access check failed with error: ${error.message}`);
        return false; // Return false on failure
    }
};



module.exports = { accessCheck }