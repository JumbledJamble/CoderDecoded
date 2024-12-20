const express = require("express")
const router = express.Router()
const { handleLogout } = require("../controllers/userControllers/logoutController.js")

router.get("/", handleLogout)

module.exports = router;