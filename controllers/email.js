const Email = require('../models/email');

exports.save = (req, res, next) => {
	const title = req.body.title;
	const text = req.body.text;
	const author = req.body.author;
	const timer = req.body.timer;
	const user = req.user.id;

	if (!req.user) {
		return res.status(401).send({ error: 'Access Denied' });
	}
	if (!title || !text || !author || !timer) {
		return res.status(422).send({
			error: 'You can not provide an empty value for any of the Email fields'
		});
	}
	Email.findOne({ title: title }, (err, existingEmail) => {
		if (err) {
			return next(err);
		}
		if (existingEmail) {
			return res.status(422).send({ error: 'Email title is already in use' });
		}

		const email = new Email({
			title: title,
			author: author,
			text: text,
			timer: timer,
			_user: user
		});
		email.save((err) => {
			if (err) {
				return next(err);
			}
			res.json(email);
		});
	});
};

exports.findEmailsFromUser = (req, res, next) => {
	if (!req.user) {
		return res.status(401).send({ error: 'Access Denied' });
	}

	Email.find({ _user: req.user.id }).then((emails) => {
		res.send(emails);
	});
};

exports.update = (req, res, next) => {
	const title = req.body.title;
	const text = req.body.text;
	const author = req.body.author;
	const timer = req.body.timer;

	if (!title || !text || !author || !timer) {
		return res.status(422).send({
			error: 'You can not provide an empty value for any of the Email fields'
		});
	}

	if (!req.user) {
		return res.status(401).send({ error: 'Access Denied' });
	}
	Email.findByIdAndUpdate(
		{ _id: req.body.id },
		{
			title: title,
			text: text,
			author: author,
			timer: timer
		},
		{ new: true },
		(err, result) => {
			if (err) {
				return next(err);
			}
			console.log(result);
			res.json(result);
		}
	);
};
