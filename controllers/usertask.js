const bcrypt = require('bcryptjs');
const passport = require('passport');
const validator = require("email-validator");
const User = require('../models/Users');
const randomstring = require('randomstring');
const mailer = require('../misc/mailer');
let urlVerify = 'http://localhost:3000/users/verify';

//handle for user
//method get,post register user
exports.getSignUp=function(req, res) 
{ 
    let messages =  req.flash('error_msg');
    res.render('registration',{ messages: messages, hasErrors: messages.length >0});
};
exports.postSignUp= (req, res) => {
    const {username, name, email, password, password2} = req.body;
    let errors = [];

    if(!username || !name || !email || !password || !password2){
        errors.push({msg: 'Vui lòng nhập đầy đủ thông tin!'});
    }

    if(!username.match(/^[a-zA-Z0-9]{3,30}$/)){
        errors.push({msg: 'Tên tài khoản chỉ chứa các ký tự a-z, A-Z hoặc 0-9, độ dài 3-30 ký tự!'});
    }

    if(!validator.validate(email)){
        errors.push({msg: "Email không hợp lệ!"});
    }

    if(password !== password2){
        errors.push({msg: 'Xác nhận mật khẩu không đúng'});
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
        User.findOne({username: username})
            .then(user => {
                if(user){
                    // user exist
                    errors.push({msg: 'tài khoản đã tồn tại'})
                    req.flash('error_msg',errors);
                    let messages =  req.flash('error_msg');
                    res.render('registration',{
                        messages: messages,
                        hasErrors: messages.length >0
                    });
                }else{
                    //create new user
                    const newUser = new User({
                        username,
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

                            // create secret token
                            const secretToken = randomstring.generate();
                            newUser.secretToken = secretToken;

                            //inactive account
                            newUser.active = false;
                            let successMsg=[];

                            //save into database
                            newUser.save()
                                .then(user => {
                                    successMsg.push({msg: 'Bạn đã đăng ký thành công!'});
                                    // mail
                            const html = `Xin chào,
                            <br/>
                            Cảm ơn bạn đã đăng ký tài khoản tại cửa hàng của chúng tôi!
                            <br/><br/>
                            Vui lòng xác nhận tài khoản bằng cách nhập đoạn mã dưới đây:
                            <br/>
                            Mã: <b>${secretToken}</b>
                            <br/>
                            Tại địa chỉ:
                            <a href="${urlVerify}">${urlVerify}</a>
                            <br/><br/>
                            Chúc bạn có một ngày vui vẻ.` 
                                
                            // send email
                            mailer.sendEmail('admin@fashiop.herokuapp.com', newUser.email, 'Fashiop xác nhận tài khoản', html);
                            successMsg.push({msg: 'Vui kiểm tra mã xác nhận trong email!'});
                            req.flash('success_messages', successMsg);
                            res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
          
                        }))
                }
            });
    }

};

//method get,post for verify
exports.getVefify = (req, res) => {
    res.render('verify');
};
exports.postVefify = async (req, res, next) => {
    try{
        const { secretToken } = req.body;
        const user = await User.findOne({ 'secretToken': secretToken });
        if(!user){
            res.redirect('/users/verify');
            return;
        }
        user.active = true;
        user.secretToken = '';
        await user.save();  
        let successMsg =[];
        successMsg.push({msg: 'Xác nhận thành công!'});
        req.flash('success_messages', successMsg);
        res.redirect('/users/login');
    }catch(error){
        next(error);
    }
}

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