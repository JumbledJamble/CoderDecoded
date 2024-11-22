const User = require("../../models/User")
const handleErrors = require("../../models/loginErrors")

const handleUserSignUp = async (req, res) => {
    const { username, email, password, remember } = req.body;

    const foundUsername =  await User.findOne({username : usernameOrEmail}).exec()
    const foundEmail = await User.findOne({email : usernameOrEmail}).exec()
    let errors;

    if(foundUsername){
        errors.username = "User with that username already exists";
    }

    if(foundEmail){
        errors.email = "User with that email already exists";
    }
    // if errors currently exist, res.json before try/catch
    if(errors?.email || errors?.username)
    try {
        const user = await User.create({ username, email, password });
        if(user){
            req.user = {username : user.username, _id : user._id};
            res.redirect('profile')
        }
      }
      catch(err) {
        errors = handleErrors(err);
        res.status(400).json({ errors });
      }
}

module.exports = { handleUserSignUp };