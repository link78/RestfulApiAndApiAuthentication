var User = require('../models/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/configuration');

exports.register = function(req, res, next)
{


	if(!req.body.email || !req.body.username || !req.body.password){
		res.json({success: false, msg: 'Please enter email and password'});
	} else {
		var user = new User({
			email: req.body.email,
			username: req.body.username,
			password: req.body.password
		});


		user.save((err) => {
			if (err) {
        return res.json({ success: false, message: 'That email address already exists.'});
             }
      res.json({ success: true, message: 'Successfully created new user.' });
		});
	}


};


exports.authenticate = function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({email: email}, (err, user)=> {
		if(err) throw err ;

		if(!user) {
			res.json({
				succes: false, message:'User not found. Authentication failed'
			});
		}

		user.comparePassword(password, (err, isMatch) => {
			if(err) throw err ;

			if(isMatch) {
				const token = jwt.sign(user.toJSON(), config.secret, { expiresIn: '1h' });
				 res.json({
                    success: true,
                    token: 'JWT: '+ token, 
                    user: {
                    	id : user._id,
                    	email: user.email,
                    	username: user.username
                    } 
                });

			} else {

				res.json({
				succes: false, message:'Invalid passport. Authentication failed'
			});
			}
		});
	});
};