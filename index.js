require('dotenv').config()

const express = require("express");
const path = require('path');
const engine = require('ejs-mate');
const passport = require('passport')
const session = require('express-session')
const morgan = require('morgan');

//init
const app = express();
require('./database');
require('./passport/local-auth');

//Configuraciones
const PORT = process.env.PORT || 3000;
app.set('port', process.env.PORT || 3000);
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())

//RUTAS
app.use('/', require('./routes/index'));


//Arrancando server
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

