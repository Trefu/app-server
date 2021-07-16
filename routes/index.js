const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/', (req, res, next) => {
    res.render("index")
})

router.get('/signup', (req, res, next) => {
    res.render("signup")
})
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}))

router.get('/login', (req, res, next) => {
    res.send("Login")

})

router.get('/test', (req, res, next) => {
    res.render("test")

})

router.post('/test', (req, res, next) => {
    console.log(req.body)

})

router.post('/login', (req, res, next) => {
    res.send("LOGIN POST")
})

router.get('/profile', (req, res, next) => {
    res.render('profile')
})

module.exports = router