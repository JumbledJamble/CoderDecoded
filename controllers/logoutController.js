const User = require("../models/User")

const handleLogout = async (req, res, next) => {

    console.log(`Signing out ${req.user} and clearing their cookies.`)
    const cookies = req.cookies;

    if(!cookies?.accessToken && !cookies?.refreshToken) return res.sendStatus(204)

    const refreshToken = cookies.refreshToken;
    const foundUser = await User.findOne({refreshToken : refreshToken})
    if(!foundUser) {
        res.clearCookie("refreshToken", { httpOnly: true, sameSite: 'None', secure: true })
        res.clearCookie("accessToken", { httpOnly: true, sameSite: 'None', secure: true })
        return res.sendStatus(204);
    }

    foundUser.refreshToken = "null";
    await foundUser.save()
    res.clearCookie("refreshToken", { httpOnly: true, sameSite: 'None', secure: true })
    res.clearCookie("accessToken", { httpOnly: true, sameSite: 'None', secure: true})

    res.redirect('/')
    
}

module.exports = { handleLogout }