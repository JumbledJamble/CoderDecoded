require("dotenv").config()
const express = require('express');
const app = express();
const { createServer } = require('node:http');
const port = 5000;
const httpServer = createServer(app);
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// const User = require('./models/User');
// const  connectDB  = require('./controllers/authController.js')
// const { handleNewUser } = require('./handleUsers/signUpHandler')
const logRoute = require('./routes/logRoute.js')
const searchProfile = require('./routes/searchProfile.js')
const ownProfileRoute = require('./routes/ownProfileRoute.js')
const authRoutes = require("./routes/authRoutes.js")
const refresh = require("./routes/refresh.js")
const verifyJWT = require("./middlewear/verifyJWT.js");
const cookieParser = require("cookie-parser");

app.use(cookieParser())
app.use(express.static('src'))


app.use(authRoutes)
app.use(searchProfile);
app.use(refresh)

app.use(verifyJWT)

app.use(logRoute);
app.use(ownProfileRoute);

app.get("/", (req, res) => {
    res.render('home')
})

httpServer.listen(port, () => {
    console.log(`Running Coder:Decoded on port ${port}`);
})