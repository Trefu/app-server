const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/authjs')
const passport = require('passport');

router.get('/', (req, res, next) => {
    res.render("index")
})

router.get('/signup', (req, res, next) => {
    res.render("signup")
})

router.get('/login', ensureGuest, (req, res, next) => {
    res.render("login")
});


//LOGIN
router.post('/auth/login', async (req, res, next) => {
    passport.authenticate('local-signin', {
        passReqToCallback: true
    },
        (err, user, info) => {
            if (err) return next(err);
            if (!user) return res.status(401).json(info);
            req.login(user, (err) => {
                if (err) return next(err)
            })
            res.json({ email: user.email, info });
            return
        })(req, res, next)
});




//SIGN UP
router.post('/signup', async (req, res, next) => {
    passport.authenticate('local-signup',
        (err, auth, info) => {
            if (err) return next(err)
            if (!auth) return res.json({ info })
            res.json({ auth, info });
            return
        })(req, res, next)
})

router.get('/profile', ensureAuth, (req, res, next) => {
    res.render('profile', { userinfo: req.user });
})

router.get('/logout', (req, res, next) => {
    req.logOut();
    res.redirect('/');
})


module.exports = router