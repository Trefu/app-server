const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render("index")
})

router.get('/signup', (req, res, next) => {
    res.render("signup")
})
router.post('/signup', (req, res, next) => {

})

router.get('/login', (req, res, next) => {
    res.send("Login")

})

router.post('/login', (req, res, next) => {
    res.send("LOGIN POST")
})

module.exports = router