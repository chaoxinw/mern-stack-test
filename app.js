const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');
const hello = require('./routes/api/hello');

const app = express();

//Body parser middleware
app.use(bodyParser.json());

//connect to database
const dbURI = require('./config/keys').mongoURI;
mongoose
	.connect(dbURI)
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.log(err));


/*
	difference between use() and get()
	get() calls use() inside of its implementation 

	use() is for binding middleware to application

	Middleware 
	Express application is a series of middleware function calls 

	Middleware is software that allows a bunch of isolated systems to interact
	use middleware to hook many isolated systems up 
*/
app.use('/api/items', items);

app.use('/api/hello', hello);

//server static assets
if (process.env.NODE_ENV === 'production') {
	//set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

// app.listen(process.env.PORT);

