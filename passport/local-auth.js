const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//mantiene una sesion del lado del cliente
passport.serializeUser((user, done) => {
    done(null, user.id)
})

//quita la sesion
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
})

passport.use('local-signup', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ 'email': email })
    console.log("existe: " + user);
    if (user) return done(null, false, req.flash('signupMessage', 'El correo ya esta registrado.'));
    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    await newUser.save();
    done(null, newUser)

}))