const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const validator = require("email-validator");

const User = require('../models/Users');

const { forwardAuthenticated } = require('../config/auth');


router.get('/profile', isLoggedIn, (req, res) => {res.render('profile')});
    

//Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login');
  });

router.use('/', notLoggedIn, function (req, res, next) {
    next();
});


//register post handle
router.post('/registration', (req, res) => {
    const { name, email, password, password2} = req.body;

    let errors = [];
    
    if(!name || !email || !password || !password2){
        errors.push({msg: 'Vui lòng nhập đầy đủ thông tin!'});
    }

    if(!validator.validate(email)){
        errors.push({msg: "Email không hợp lệ!"});
    }

    if(password !== password2){
        errors.push({msg: 'Xác nhận mặt khẩu không đúng'});
    }

    if(password.length < 6){
        errors.push({msg: 'Mật khẩu phải dài hơn 6 ký tự'});
    }
    
    if(errors.length > 0){
        req.flash('error_msg',errors);
        let messages =  req.flash('error_msg');
        res.render('registration',{
            messages: messages,
            hasErrors: messages.length > 0
        });
    }else{
        User.findOne({email: email})
            .then(user => {
                if(user){
                    // user exist
                    errors.push({msg: 'Email đã tồn tại'})
                    req.flash('error_msg',errors);
                    let messages =  req.flash('error_msg');
                    res.render('registration',{
                        messages: messages,
                        hasErrors: messages.length >0
                    });
                }else{
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    //Hash password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            //set new password
                            newUser.password = hash;
                            //save
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'Bạn đã đăng ký thành công, có thể đăng nhập ngay bây giờ')
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                        }))
                }
            });
    }

});
router.get('/registration', forwardAuthenticated, function(req, res) 
{ 
    let messages =  req.flash('error_msg');
    res.render('registration',{ messages: messages, hasErrors: messages.length >0});
});

router.get('/login', function(req, res) 
{ 
    console.log('hello');
    let messages =  req.flash('error');
    console.log(messages);
    res.render('login',{ messages: messages, hasErrors: messages.length >0});
});

// login post handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: 'login',
        failureFlash: true
    })(req, res, next);
});

//logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login')
})

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}