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
});


//LOGIN
router.post('/login', async (req, res, next) => {
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

router.get('/profile', isAuthenticated, (req, res, next) => {
    res.render('profile');
})

router.get('/logout', (req, res, next) => {
    req.logOut();
    res.redirect('/');
})
//Si no esta logeado, redirreciona a login
function isAuthenticated(req, res, next) {
    console.log(req.isAuthenticated())
    if (!req.isAuthenticated()) {
        res.redirect('/login');
        return
    }
    return next()
}

//si esta logeado,redirect a profile
function isLoged(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/profile');
        return
    }
    return next()
}

module.exports = router