const User = require('../models/User');
const jwt = require('jsonwebtoken')

const handleUserSignIn = async (req, res) => {
    const { usernameOrEmail, password, remember } = req.body
    
    const foundUsername =  await User.findOne({username : usernameOrEmail}).exec()
    const foundEmail = await User.findOne({email : usernameOrEmail}).exec()

    // TODO Also make unsuccessful login attempts able to try again
    if(foundUsername) {    
        if(foundUsername.password == password) {
            signInUser(foundUsername.username);
        }else{
            res.status(404).send("Incorrect password, please try again")
        }
    } 
    else if(foundEmail) {
        if(foundEmail.password == password) {
            signInUser(foundEmail.username);
        } else {res.status(404).send("Incorrect password, please try again")}
    } else { res.status(404).send(`User not found. Incorrect Email or Password`)}


    async function signInUser (username) {
        console.log("Sign in successful")
        let accessTime, refreshTime;

        if(remember == true){
            accessTime = "1d";
            refreshTime = "90d";
        } else {
            accessTime = "2h";
            refreshTime = "30d";
        }

        const accessToken = jwt.sign(
            { "username": username  },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn : accessTime  }
        )


        const refreshToken = jwt.sign(
            { "username": username  },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn : refreshTime}
        )

        const user = await User.findOne({ username }).exec();
        user.refreshToken = refreshToken;
        await user.save();

        console.log(`Access token: ${accessToken}`)
        console.log(`Refresh token: ${refreshToken}`)

        res.cookie('refreshToken', refreshToken, { 
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000 })
        
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day or match the accessToken expiry time
        });

        res.redirect('ownProfile')


    }

}
module.exports = { handleUserSignIn };