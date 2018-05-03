
 const auth = require('../controllers/user.controller');

module.exports = function(app) {

	const passport = require('passport');

	 app.post('/users/register', auth.register);
	 app.post('/users/authenticate', auth.authenticate);
	


	app.get('/users/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send(req.user);
    });


};

