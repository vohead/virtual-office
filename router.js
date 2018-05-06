// Imports
const AuthenticationController = require('./controllers/authentication');
const StoryController = require('./controllers/story');
const EmailController = require('./controllers/email');
const passportService = require('./passport');
const passport = require('passport');

// authenticates request
const requireSignin = passport.authenticate('local', { session: true });

// routing logic
module.exports = (app) => {

	app.post('/api/signup', AuthenticationController.signup);
	app.post('/api/signin', requireSignin, AuthenticationController.signin);
	app.get('/api/logout', AuthenticationController.signout);

	app.post('/api/story', StoryController.save);
	app.put('/api/story', StoryController.update);
	app.get('/api/story/:id', StoryController.findSingleStory);
	app.get('/api/stories', StoryController.findStoriesFromUser);
	app.delete('/api/story/:id', StoryController.delete);

	app.post('/api/email', EmailController.save);
	app.put('/api/email', EmailController.update);
	app.get('/api/emails', EmailController.findEmailsFromUser);
	app.delete('/api/email/:id', EmailController.delete);
};
