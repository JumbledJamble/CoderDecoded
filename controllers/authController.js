const User = require('../models/User');
const jwt = require('jsonwebtoken')

const handleUserSignIn = async (req, res) => {
    const { usernameOrEmail, pass, remember } = req.body

    const foundUsername =  await User.findOne({username : usernameOrEmail}).exec()
    const foundEmail = await User.findOne({email : usernameOrEmail}).exec()

    // TODO Also make unsuccessful login attempts able to try again
    if(foundUsername) {
        
        if(foundUsername.password == pass) {
            signInUser(foundUsername.username, foundUsername.decks);
        }else{res.status(404).send("Incorrect password, please try again")}
    } else if(foundEmail) {
        if(foundEmail.password == pass) {
            signInUser(foundEmail.username, foundEmail.decks);
        } else {res.status(404).send("Incorrect password, please try again")}
    } else { res.status(404).send(`User not found. Incorrect Email or Password`)}
}

async function signInUser (username, decks) {
    req.session.signedIn = true;
    req.session.username = username;
    req.session.decks = decks;

    if(remember == true){
        const accessTime = "90d";
        const refreshTime = "";
    } else {
        const accessTime = "1d";
        const refreshTime = "";
    }

    const accessToken = jwt.sign(
        { "username": username  },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn : accessTime}
    )

    
    const refreshToken = jwt.sign(
        { "username": username  },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn : refreshTime}
    )

    User.refreshToken = refreshToken;
    await User.save();
    
    res.cookie('jwt', refreshToken, {httpOnly : true, maxAge : 60 * 60 * 24 * 1000})
    res.json({ accessToken });

    res.redirect('/userHome')
}


module.exports = { handleUserSignIn };