const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.json({
      message: 'logeado puto',
      user: req.user
    })
  }
)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))


router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
