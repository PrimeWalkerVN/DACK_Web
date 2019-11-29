const bcrypt = require('bcryptjs');
const passport = require('passport');
const validator = require("email-validator");
const User = require('../models/Users');

//method get,post register user
exports.getSignUp=function(req, res) 
{ 
    let messages =  req.flash('error_msg');
    res.render('registration',{ messages: messages, hasErrors: messages.length >0});
};
exports.postSignUp= (req, res) => {
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
                    //create new user
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
                            //save into database
                            newUser.save()
                                .then(user => {
                                    req.flash('success_messages', 'Bạn đã đăng ký thành công, có thể đăng nhập ngay bây giờ');
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                        }))
                }
            });
    }

};


//method get,post for login user 
exports.getSignIn = function(req, res) 
{ 
    let errMessages =  req.flash('error');
    let successMessages =  req.flash('success_messages');
    console.log(successMessages);
    res.render('login',{ errorMessages: errMessages,successMessages:successMessages, 
        hasErrors: errMessages.length >0, hasSuccess: successMessages.length>0});
};
exports.postSignIn = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: 'login',
        successFlash: true,
        failureFlash: true
    })(req, res, next);
};


//handle user already logged in or not
exports.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
exports.notLoggedIn = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}