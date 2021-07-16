const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render("index")
})

router.get('/signup', (req, res, next) => {
    res.send("REGISTRO WEB")
})
router.post('/signup', (req, res, next) => {
    res.send("REGISTRO POST")
})

router.get('/login', (req, res, next) => {
    res.send("Login")

})

router.post('/login', (req, res, next) => {
    res.send("LOGIN POST")
})

module.exports = router