require('dotenv').config()

const express = require("express");
const path = require('path');
const engine = require('ejs-mate');
const passport = require('passport')
const session = require('express-session')
const morgan = require('morgan');
const MongoStore = require('connect-mongo');

//init
const app = express();
require('./database');
require('./passport/local-auth');
require('./passport/google-auth')

//Configuraciones
const PORT = process.env.PORT || 3000;
app.set('port', process.env.PORT || 3000);
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
//EXPRESS SESSION
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}));
app.use(passport.initialize())
app.use(passport.session())

//RUTAS
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'))


//Arrancando server
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

