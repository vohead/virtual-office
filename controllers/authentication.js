const User = require('../models/user');

exports.signup = (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;
	if (!username || !password) {
		return res.status(422).send({ error: 'You must provide username and password' });
	}
	User.findOne({ username: username }, (err, existingUser) => {
		if (err) {
			return next(err);
		}
		if (existingUser) {
			return res.status(422).send({ error: 'Username already in use' });
		}

		const user = new User({
			username: username,
			password: password
		});
		user.save((err) => {
			if (err) {
				return next(err);
			}
			res.json(user);
		});
	});
};

exports.signin = (req, res, next) => {
	res.send({ status: true, username: req.body.username });
};

exports.signout = (req, res, next) => {
	req.logout();
	res.send(false);
};
