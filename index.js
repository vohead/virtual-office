const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const passport = require('passport');
const app = express();
const router = require('./router');
const keys = require('./keys');


mongoose.connect(keys.dbUrl);
mongoose.Promise = global.Promise;

require('./models/user');
require('./models/email');
require('./models/story');

// App Setup

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [ keys.cookieKey ]
	})
);

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

router(app);

// Server Setup
const port = process.env.PORT || 3090;
app.listen(port, () => {
	console.log('Server listening on port:', port);
});
