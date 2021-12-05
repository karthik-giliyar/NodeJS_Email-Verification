const express = require("express")
const { signup, signin, verify } = require("../controllers/user")
const {check} = require('express-validator')
const router = express.Router()

router.post('/signup', [
    check("email", "Email should be valid").isEmail(),
    check("password", "Password at least should be 6 characters").isLength({min: 6}),
] ,signup)

router.post('/signin', signin)
router.post('/verify', verify)

module.exports = router;