const Customer = require('../models/customer');



exports.list = function(req, res, next) {
	Customer.find()
	.sort({name: 'descending'})
	.exec(function(err, customers) {
		if(err) { return next(err);}
		res.json({
			success: true, msg: 'successful request',customers
		});
	});
};

exports.create = function(req, res, next) {
	const newCusto = new Customer(req.body);

	newCusto.save((err) => {
		if(err) { return next(err);}

		res.json({ success: true, message: 'New customer has been created' });
	});
};


exports.getByPhone = function(req, res, next){
	var q = {};
	if(req.query.email){
    q.email = req.query.email;}

	Customer.find(q, (err, customer) => {
		if(err){
			res.json({success: false, msg: 'Unsuccessful request'});
		}

		//res.json({success: true, msg: 'successful request',customer});
		res.status(200).json(customer);
	});
};



exports.read = function(req, res) {
	res.json(req.customer);
};


exports.getById = function(req, res, next, id) {
    
	Customer.findById({ _id: id}, (err, customer) => {
		if(err) {
			return next(err);
		}else {
			req.customer = customer ;
			next();
			
		}
	});
};

exports.update = function(req, res, next) {
	Customer.findByIdAndUpdate(req.customer.id, req.body, {
		'new': true
	}, (err, customer) => {
		if(err) {
			return next(err);
		}else {
			//res.json({success: true, msg: 'successful update', customer});
			res.status(200).json(customer);
		}
	});
};


exports.delete = function(req, res, next) {
	req.customer.remove(err => {
		if(err) {
			return next(err);
		}else {
			res.json({success: true, msg: 'customer has been deleted', customer});
		}
	});
};