const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/', (req, res, next) => {
    res.render("index")
})

router.get('/signup', (req, res, next) => {
    res.render("signup")
})

router.get('/login', isLoged, (req, res, next) => {
    res.render("login")
})

router.post('/login', async (req, res, next) => {
    passport.authenticate('local-signin',
        (err, auth, info) => {
            if (err) return next(err)
            if (!auth) return res.status(401).json(info)
        })(req, res, next)
});

router.post('/signup', async (req, res, next) => {
    passport.authenticate('local-signup',
        (err, auth, info) => {
            if (err) return next(err)
            if (!auth) return res.status(401).json(info)
        })(req, res, next)
})

router.get('/profile', isAuthenticated, (req, res, next) => {
    res.render('profile')
})

router.get('/logout', (req, res, next) => {
    req.logOut();
    res.redirect('/');
})

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
}
function isLoged(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/profile')
}


module.exports = router