const express = require('express');
const router = express.Router();
const userTask = require('../controllers/userTask')
const { forwardAuthenticated } = require('../config/auth');

//load profile user
router.get('/profile', userTask.isLoggedIn, (req, res) => {res.render('profile')});
    
//Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login');
});
router.use('/', userTask.notLoggedIn, function (req, res, next) {next();});

//register
router.post('/registration',userTask.postSignUp); 
router.get('/registration', forwardAuthenticated, userTask.getSignUp);

//verify
router.get('/verify', forwardAuthenticated, userTask.getVefify);
router.post('/verify', userTask.postVefify);

// login 
router.get('/login', userTask.getSignIn);
router.post('/login', userTask.postSignIn);

module.exports = router;

