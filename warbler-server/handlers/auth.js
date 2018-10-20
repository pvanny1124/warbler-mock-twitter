const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next){
    try{
    
        let user = await db.User.findOne({
            email: req.body.email
        });

        let { id, profileImageUrl, username } = user;
        let isMatch = await user.comparePassword(req.body.password);

        if(isMatch){
            let token = jwt.sign(
                {
                    id,
                    username,
                    profileImageUrl
                }, 
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                id, 
                username,
                profileImageUrl,
                token
            });

         } else {
                return next({
                    status: 400,
                    message: "Invalid Email/Password"
                });
            }

    } catch(e) {
            return next({
                status: 400,
                message: "Invalid Email/Password"
            });
        }
}

exports.signup = async function(req, res, next){
        try {
            //Create user
            let user = await db.User.create(req.body);
            console.log(user)
            var { id, username, profileImageUrl } = user;

            //create token
            let token = jwt.sign(
                {
                    id,
                    username,
                    profileImageUrl
                }, 
                process.env.SECRET_KEY
            );

            console.log(token);
            //return status 200 with json that contains the user information
            //user information will be encrypted
            return res.status(200).json({
                id,
                username,
                token
            });
          

        } catch(err){
            //see what kind of error
            if(err.code === 11000){
                err.message = "Sorry, that username/email is already taken";
            }

            return next({
                status: 400,
                message: err.message
            })
        }
}