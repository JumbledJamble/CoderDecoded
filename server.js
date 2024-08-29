require("dotenv").config()
const express = require('express');
const app = express();
const { createServer } = require('node:http');
const port = 5000;
const httpServer = createServer(app);
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const cors = require('cors');
const connectDB = require('./controllers/dbConnection.js')
const mongoose = require("mongoose")


const { redirectInvalidTokens } = require("./middlewear/redirectInvalidUsers.js")
const { redirectValidTokens } = require("./middlewear/redirectValidUsers.js")

const cookieParser = require("cookie-parser");
const credentials = require('./middlewear/credentials.js')
const corsOptions = require('./.config/corsOptions.js')



app.use(credentials)
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.static('src'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/////// initialize database ///////////

const connectTest = async() => {
    try { await connectDB();}
    catch (err) {console.log(err)}
}

connectTest();

mongoose.connection.once("open", () => {
    console.log("logging from server.js, mongoose sucess")
})
mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});



app.get("/", (req, res) => {
    res.render('home')
})


app.use("/logout", require("./routes/logout.js"))

//app.use("/", require("./routes/homeRoute.js"))
app.use("/signIn", redirectValidTokens, require("./routes/authRoutes.js"));
app.use("/searchProfile", redirectValidTokens, require("./routes/searchProfile.js"));


app.use("/log", redirectInvalidTokens, require("./routes/logRoute.js"));
app.use("/ownProfile", redirectInvalidTokens, require("./routes/ownProfileRoute.js"))


httpServer.listen(port, () => {
    console.log(`Running Coder:Decoded on port ${port}`);
})