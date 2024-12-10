const User = require('../../models/User');
const jwt = require('jsonwebtoken')

const handleUserSignIn = async (req, res) => {
    const { usernameOrEmail, password, remember } = req.body
    console.log(usernameOrEmail)
    console.log(password)
    console.log(remember)

    const foundUsername =  await User.findOne({username : usernameOrEmail}).exec()
    const foundEmail = await User.findOne({email : usernameOrEmail}).exec()

    if(foundUsername) {    
        if(foundUsername.password == password) {
            signInUser(foundUsername.username, remember);
        }else{
            res.status(404).json({error: "Incorrect password, please try again"})
        }
    } 
    else if(foundEmail) {
        if(foundEmail.password == password) {
            signInUser(foundEmail.username, remember);
        } else {
            res.status(404).json({error: "Incorrect password, please try again"})}
    } else { res.status(404).json({error: 'User not found. Incorrect Username/Email'})}


    async function signInUser (username, remember) {
        console.log("Sign in successful")
        let accessTime, refreshTime;
        console.log(`remember is ${remember}`)
        if(remember){
            accessTime = "1d";
            refreshTime = "90d";
        } else {
            accessTime = "2h";
            refreshTime = "1d";
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
        if(!user){
            console.log("User not found during sign in at controller")
        }
        user.refreshToken = refreshToken;
        await user.save();

        req.user = {username : username, _id : user._id};

        console.log(`Sending ${username} an access token and a refresh token.`)

        res.cookie('refreshToken', refreshToken, { 
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000 })
        
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.render('profile', {profile: req.user.username})
    }

}
module.exports = { handleUserSignIn };