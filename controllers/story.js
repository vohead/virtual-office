const Story = require('../models/story');

exports.save = (req, res, next) => {
	const title = req.body.title;
	const text = req.body.text;
	const author = req.body.author;
	const emails = req.body.emails;
	const user = req.user.id;

	if (!req.user) {
		return res.status(401).send({ error: 'Access Denied' });
	}
	if (!title || !text || !author) {
		return res.status(422).send({ error: 'You can not provide an empty value for any of the story fields' });
	}
	Story.findOne({ title: title }, (err, existingStory) => {
		if (err) {
			return next(err);
		}
		if (existingStory) {
			return res.status(422).send({ error: 'Story title is already in use' });
		}

		const story = new Story({
			title: title,
			author: author,
			text: text,
			emails: emails,
			_user: user
		});
		story.save((err) => {
			if (err) {
				return next(err);
			}
			res.json(story);
		});
	});
};

exports.findStoriesFromUser = (req, res, next) => {
	if (!req.user) {
		return res.status(401).send({ error: 'Access Denied' });
	}

	Story.find({ _user: req.user.id }).then((stories) => {
		res.send(stories);
	});
};

exports.update = (req, res, next) => {
	const title = req.body.title;
	const text = req.body.text;
	const author = req.body.author;
	const emails = req.body.emails;

	if (!title || !text || !author) {
		return res.status(422).send({
			error: 'You can not provide an empty value for the timer, text, title or author field'
		});
	}

	if (!req.user) {
		return res.status(401).send({ error: 'Access Denied' });
	}
	Story.findByIdAndUpdate(
		{ _id: req.body.id },
		{
			title: title,
			text: text,
			author: author,
			emails: emails
		},
		{ new: true },
		(err, result) => {
			if (err) {
				return next(err);
			}
			res.json(result);
		}
	);
};

exports.delete = (req, res, next) => {
	if (!req.user) {
		return res.status(401).send({ error: 'Access Denied' });
	}
	const id = req.params.id;

	Story.findByIdAndRemove({ _id: id }).then((story) => res.status(204).send(story)).catch(next);
};
