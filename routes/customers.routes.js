const custumerControl = require('../controllers/customer.controller');
const passport = require('passport');

module.exports = function(app) {

	

	app.get('/customer/getAll',passport.authenticate('jwt', { session: false }) ,custumerControl.list);
	app.get('/customer/email',passport.authenticate('jwt', { session: false }), custumerControl.getByPhone);
	app.post('/customer/create',passport.authenticate('jwt', { session: false }), custumerControl.create);


	//passport.authenticate('jwt', { session: false })

	// app.get('/customer/:customerId', custumerControl.read);
	// app.put('/customer/:customerId', custumerControl.update);
	// app.delete('/customer/:customerId', custumerControl.delete);

	app.route('/customer/:customerId')
	.get(passport.authenticate('jwt', { session: false }), custumerControl.read)
	.put(passport.authenticate('jwt', { session: false }) ,custumerControl.update)
	.delete(passport.authenticate('jwt', { session: false }),custumerControl.delete);

  	


app.param('customerId', custumerControl.getById);
};