const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/Users');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField : 'username'},(username, password, done) => {
            //Match user
            User.findOne({username: username})
                .then(user => {
                    if(!user){
                        return done(null, false, { message: 'Tài khoản chưa được đăng ký!'});
                    }
                    console.log(user.status);
                    if(user.status == "Khóa"){
                        return done(null, false, { message:'Tài khoản của bạn đã bị khoá!'});
                    }
                    // match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(isMatch){
                            return done(null, user);
                        }else{
                            return done(null, false, {message: 'Mật khẩu không chính xác!'});
                        }
                    });

                    //Check if email has been verified
                    if (!user.active) {
                        return done(null, false, { message: 'Xin lỗi, bạn chưa xác nhận email!' });
                    }
                })
                .catch(err => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
    });
}