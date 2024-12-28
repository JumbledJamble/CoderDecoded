const User = require("../../models/User")
const jwt = require('jsonwebtoken')
const handleErrors = require("../../models/loginErrors")

const handleUserSignUp = async (req, res) => {
    const { Username, Email, Password } = req.body;
    console.log(`${Username} here`)


    const foundUsername =  await User.findOne({username : Username}).exec()
    const foundEmail = await User.findOne({email : Email}).exec()
    let errors = {};

    if(foundUsername){
        errors.username = "User with that username already exists";
    }

    if(foundEmail){
        errors.email = "User with that email already exists";
    }
    // if errors currently exist, res.json before try/catch
    if(errors?.email || errors?.username){
        return null
    }

    try {
        const user = await User.create({
            username: Username,
            email : Email,
            password: Password,
            logsCreated: 0,
            projects: [],
            refreshToken: null,
            logs: [],
            notifications: [],
        });

        console.log("Create completed")
        if(!user){
            errors.create = "Database failure."
        }
        req.user = {username : user.username, _id : user._id};


        const accessToken = jwt.sign(
        { "username": Username  },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn : "2h"}
        )


        const refreshToken = jwt.sign(
        { "username": Username  },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn : "1d"}
        )

        if(!user){
            console.log("User not found during sign in at controller")
        }
        user.refreshToken = refreshToken;
        await user.save();


        console.log(`Sending ${Username} an access token and a refresh token.`)

        res.cookie('refreshToken', refreshToken, { 
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        })
    
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.render('profile', {profile: req.user.username})
            
      }
      catch(err) {
        errors = handleErrors(err);
        res.status(400).json({ errors });
      }
}

module.exports = { handleUserSignUp };