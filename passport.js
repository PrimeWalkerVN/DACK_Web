const LocalStrategy = require('passport-local').Strategy;
const mogoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/Users');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField : 'email'},(email, password, done) => {
            //Match user
            User.findOne({email: email})
                .then(user => {
                    if(!user){
                        return done(null, false, { message: 'Email chưa được đăng ký'});
                    }
                    
                    // match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(isMatch){
                            return done(null, user);
                        }else{
                            return done(null, false, {message: 'Mật khẩu không chính xác!'});
                        }
                    });
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