const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
require('./models/user');

mongoose.connect('mongodb://localhost/virtual_office');
mongoose.Promise = global.Promise;

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
const port = process.env.PORT || 3090;
app.listen(port, () => {
	console.log('Server listening on port:', port);
});
