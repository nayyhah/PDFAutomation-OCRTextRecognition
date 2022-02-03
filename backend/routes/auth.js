const express = require('express');
const { signup, login, secret } = require('../controllers/auth');
const auth = require('../middleware/auth')();
const router = express.Router();
const passport = require('passport');
const WrapperAsync = require('../utils/WrapperAsync');
const { ValidateUser } = require('../middleware/validator');

router.post('/signup', ValidateUser, signup, login);
router.post('/login', passport.authenticate("local"), login);

router.post('/secret', auth.authenticate(), secret)
module.exports = router;