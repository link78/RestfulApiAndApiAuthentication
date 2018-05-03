var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

const SALT_FACTOR = 10;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {type:String, index: true , required: true},
    username: {type: String, trim: true, required: true},
    password: {type:String, required:true},
    created: {type: Date, default: Date.now},
    
   
});

var noop = function(){};

UserSchema.pre('save', function(done) {
	var user = this;
	if(!user.isModified('password')) {
		return done();
	}

	bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
		if(err) {
			return done(err);
		}
		bcrypt.hash(user.password, salt, noop, function(err, hashPassword) {
			if(err) {
			return done(err);
		}
		user.password = hashPassword ;
		done();
		});
	});
});


	UserSchema.methods.comparePassword = function(guess, done) {
		bcrypt.compare(guess, this.password, (err, isMatch)=>{
			//if(err) throw err;

			done(null, isMatch);
		});
	};


module.exports = mongoose.model('User', UserSchema);
