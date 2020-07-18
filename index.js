const express = require("express");
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

var app = express();

//set up view engine
app.set('view engine','ejs');

//cookie
app.use(cookieSession({
    maxAge: 24*60*60*100,
    keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI,{ useUnifiedTopology: true, useNewUrlParser: true }, () => {
  console.log('connected to mongodb');
});

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set up auth routes
app.use('/auth',authRoutes);

//set up profile routes
app.use('/profile',profileRoutes);

//create home route
app.get('/',(req,res)=>{
    res.send('home page');
});

app.listen(8080, () => {
  console.log("app running on port 8080");
});