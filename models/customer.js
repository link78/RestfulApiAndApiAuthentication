const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var addressSchema = new Schema({
	adress_line1: String,
	adress_line2: String,
	state: String,
	city: String,
	zip: Number
});



const CustomerSchema = new Schema({
	name: {type: String, required: true},
	phoneNumber: {type: Number, unique: true, require: true},
	balance: {
		type: Number,
		validate: [function(num) {
			return num >= 0 ;
		}]
	},
	address: [addressSchema],
	email: String,
	 created: {type: Date, default: Date.now}
});




module.exports = mongoose.model('Customer',CustomerSchema);