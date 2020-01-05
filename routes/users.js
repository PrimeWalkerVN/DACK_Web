const express = require('express');
const router = express.Router();
const userTask = require('../controllers/userTask')
const { forwardAuthenticated } = require('../config/auth');

const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const validator = require("email-validator");
//load profile user
router.get('/profile', userTask.isLoggedIn, (req, res) => {
    User.findById(req.user._id, function (err, user) {
        console.log(user);
        res.render('profile', user);
    })
});

router.post('/profile/info', userTask.isLoggedIn, function (req, res) {

    // User.findOneAndUpdate({
    //     username: req.user.username
    // },{name: req.body.name2, email: req.body.email2, address: req.body.address2})

    User.findOneAndUpdate({ username: req.user.username },
        { $set: { name: req.body.name2, email: req.body.email2, address: req.body.address2 } },
        { new: true },
        (err, data) => {
            if (err) console.log("Error when update info"); 
            res.redirect('/users/profile');
        }
    );
})

router.post('/profile/password', userTask.isLoggedIn, (req, res) => {
    console.log(req.body.oldpassword);
    // console(req.user.username);
    User.findById(req.user._id, function (err, user) {
        console.log("abc");
        if (err) {
            console.log(err);
        } else {
            console.log(user.password);
            console.log(req.body.oldpassword);

            bcrypt.compare(req.body.oldpassword, user.password, function (err, isMatch) {
                if (err) {
                    let errors = [];
                    res.redirect('/users/profile');
                } else {
                    console.log("check match");
                    if (isMatch) {
                        console.log("check match success");
                        if (req.body.newpassword1 === req.body.newpassword2) {
                            bcrypt.genSalt(10, (err, salt) =>
                                bcrypt.hash(req.body.newpassword1, salt, (err, hash) => {
                                    if (err) throw err;
                                    let pw = hash;
                                    console.log(hash);
                                    User.findOneAndUpdate({ _id: req.user._id }, { $set: { password: hash } },
                                        { new: true },
                                        (err, data) => {
                                            if (err) console.log("Error when update info");
                                            res.redirect('/users/profile');
                                        }
                                    )
                                }));
                        } else {
                            let errors = [];
                            errors.push('Mật khẩu không khớp!');
                            req.flash('error', errors);
                            return res.redirect(url);
                        }
                    }
                    else{
                        console.log("Password khong chinh xac");
                        res.redirect('/users/profile');
                    }
                }
            }
            )
        }
    });
})

//Logout
router.get('/logout', (req, res) => {
    req.logout();
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

