const express = require('express');
const app = express();
const { createServer } = require('node:http');
const port = 5000;
const httpServer = createServer(app);
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const mongoose = require('mongoose')
// const User = require('./models/User');
// const  connectDB  = require('./handleUsers/mongooseConnection.js')
// const { handleNewUser } = require('./handleUsers/signUpHandler')
// const { handleUserSignIn } = require('./handleUsers/signInHandler')
const logRoute = require('./routes/logRoute.js')
const searchProfile = require('./routes/searchProfile.js')
const ownProfileRoute = require('./routes/ownProfileRoute.js')
const authRoutes = require("./routes/authRoutes.js")
app.use(express.static('public'))

app.use(logRoute);
app.use(searchProfile);
app.use(ownProfileRoute);
app.use(authRoutes)

app.get("/", (req, res) => {
    res.render('home')
})