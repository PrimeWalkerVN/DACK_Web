const express = require('express');
const router = express.Router();
const userTask = require('../controllers/userTask');
const { forwardAuthenticated } = require('../config/auth');


//profile user
router.get('/profile', userTask.isLoggedIn,userTask.loadProfile);
router.post('/profile/info', userTask.isLoggedIn, userTask.updateProfile);
router.post('/profile/password', userTask.isLoggedIn,userTask.forgotPasswordUser);

//Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.session.cart ={};
    res.redirect('/users/login');
});
router.use('/', userTask.notLoggedIn, function (req, res, next) { next(); });

//register
router.post('/registration', userTask.postSignUp);
router.get('/registration', forwardAuthenticated, userTask.getSignUp);

//verify
router.get('/verify', forwardAuthenticated, userTask.getVefify);
router.post('/verify', userTask.postVefify);

//forgot password
router.get('/forgot', userTask.getForgot);
router.post('/forgot', userTask.postForgot);

//Reset password
router.get('/reset/:token', userTask.getResetPassword);
router.post('/reset/:token', userTask.postResetPassword);

// login 
router.get('/login', userTask.getSignIn);
router.post('/login', userTask.postSignIn);

module.exports = router;

