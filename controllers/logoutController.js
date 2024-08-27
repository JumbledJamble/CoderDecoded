const User = require("../models/User")

const handleLogout = async (req, res, next) => {

    console.log("signing out")
    const cookies = req.cookies;

    if(!cookies?.accessToken) return res.sendStatus(204)

    const refreshToken = cookies.refreshToken
    console.log(`ref token is ${refreshToken}`)
    const foundUser = await User.findOne({refreshToken : refreshToken})
    console.log(foundUser)
    if(!foundUser) {
        res.clearCookie("refreshToken", { httpOnly: true, sameSite: 'None', secure: true })
        res.clearCookie("accessToken", { httpOnly: true, sameSite: 'None', secure: true })
        return res.sendStatus(204);
    }

    console.log("clearing cookies")
    foundUser.refreshToken = "null";
    await foundUser.save()
    res.clearCookie("refreshToken", { httpOnly: true, sameSite: 'None', secure: true })
    res.clearCookie("accessToken", { httpOnly: true, sameSite: 'None', secure: true})

    res.redirect('/')
    
}

module.exports = { handleLogout }