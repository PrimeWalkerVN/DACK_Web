const express = require('express');
const router = express.Router();
const userTask = require('../controllers/userTask')
const { forwardAuthenticated } = require('../config/auth');
const bcrypt = require('bcryptjs');

const mailer = require('../misc/mailer');
var crypto = require("crypto");
const async = require("async");


const User = require("../models/Users");
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

//forgot password

router.get('/forgot', (req, res) => {
    res.render('forgot');
  });

router.post('/forgot', (req, res) => {
    
    async.waterfall([
        function(done){
            crypto.randomBytes(20, function(err, buf) {
                let token = buf.toString('hex');
                done(err, token);
              });
        },

        function(token, done) {
            
            User.findOne({email: req.body.email, username: req.body.username}, (err, user) => {
                if(!user){
                  let errors = [];
                  errors.push({msg: 'Tên tài khoản và email không khớp!'});
                  req.flash('error_msg', errors);
                  let messages =  req.flash('error_msg');
                  return res.render('forgot', {messages: messages,
                  hasErrors: messages.length > 0});
                }
                user.resetPasswordToken = undefined;
                user.resetPasswordToken = token;
                // console.log(token);
                // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaa");
                user.resetPasswordExpires = Date.now() + 3600000 // 1 hour
                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },

        function(token, user, done) {
          let urlResetPassword = 'http://localhost:3000/users/reset/';
          urlResetPassword += user.resetPasswordToken;
          // console.log(urlResetPassword);
          // console.log('Gui mail token quen mk aaaaaaaaaaaaaaaaa');
          const html = `Xin chào ${user.name},
                        <br/>
                        Có phải bạn muốn tìm lại mật khẩu của mình?
                        <br/><br/>
                        Nhấp vào đường dẫn bên dưới để đổi lại mật khẩu:
                        <a href="${urlResetPassword}">${urlResetPassword}</a>
                        <br/><br/>
                        Chúc bạn có một ngày vui vẻ.` 
                                
            // send email
            mailer.sendEmail('admin@fashiop.herokuapp.com', user.email, 'Fashiop thay đổi mật khẩu', html);
            let success = [];
            success.push({msg: 'Vui kiểm tra email để lấy lại mật khẩu!'});
            //req.flash('success_messages', success);
            res.render('forgot', {success:success, hasSuccess: success.length >0});
        }
    ],
        function(err){
            if(err)
                return next(err);
            res.redirect('forgot');
        });

});

router.get('/reset/:token', async(req, res) => {
    await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, async(err, user) => {
     if (!user) {
       // req.flash('error', 'Password reset token is invalid or has expired.');
        return res.redirect('/users/forgot');
      }
      let error = req.flash('error');
      res.render('reset', {token: req.params.token, error: error,hasErrors: error.length >0 });
    });
  });

router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
        if (!user) {
      //    req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }
        if(req.body.password === req.body.confirm) {
          // user.password(req.body.password, function(err) {
          //   user.resetPasswordToken = undefined;
          //   user.resetPasswordExpires = undefined;

          //   user.save(function(err) {
          //     req.logIn(user, function(err) {
          //       done(err, user);
          //     });
          //   });
          // })

          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if(err) throw err;
                //set new password
                user.password = hash;
                
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;
                
                //save into database
                user.save()
                req.logIn(user, err => {
                  done(err, user);
                });
              }));
        } else {
          let url = user.resetPasswordToken;
        //req.flash("error", "Passwords do not match.");
          let errors = [];
          errors.push( 'Mật khẩu không khớp!');
          req.flash('error', errors);
          return res.redirect(url);
        }
      });
    },
    function(user, done) {
      const html = `Xin chào, ${user.name}
                  <br/>
                  Bạn vừa thay đổi mật khẩu của mình!
                  Tài khoản thay đổi mật khẩu là <b>${user.username}</b>
                  Hãy nhanh chóng ghé thăm cửa hàng của chúng tôi và mua thật nhiều đồ nhé! ^.^` 
                              
          // send email
           mailer.sendEmail('admin@fashiop.herokuapp.com', user.email, 'Fashiop xác nhận thay đổi mật khẩu', html);
        //   successMsg.push({msg: 'Vui kiểm tra mã xác nhận trong email!'});
        //req.flash('success', 'Success! Your password has been changed.');
        let successMsg=[];  
        successMsg.push({msg: 'Mật khẩu đã thay đổi thành công! Hãy đăng nhập và tiếp tục'});
        req.flash('success_messages', successMsg);
        res.redirect('/users/logout');
    }
  ], function(err) {
    res.redirect('/login');
  });
});

// login 
router.get('/login', userTask.getSignIn);
router.post('/login', userTask.postSignIn);

module.exports = router;

