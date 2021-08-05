require('dotenv').config()

const express = require("express");
const path = require('path');
const engine = require('ejs-mate');
const passport = require('passport')
const session = require('express-session')
const morgan = require('morgan');
const MongoStore = require('connect-mongo');
const { loadNuxt, build } = require("nuxt");

//init
const app = express();
require('./database');
require('./passport/local-auth');
require('./passport/google-auth')


//Configuraciones
const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 3000;
app.set('port', process.env.PORT || 3000);
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
initNuxt();
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

const initNuxt = async () => {
  const nuxt = await loadNuxt(isDev ? "dev" : "start");

  // Render every route with Nuxt.js
  app.use(nuxt.render);

  // Build in dev to hot-reloading
  if (isDev) {
    build(nuxt);
  }
};