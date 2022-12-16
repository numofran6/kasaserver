const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
app.use(cors());
app.use(express.json());
// app.use(function (req, res, next) {
// 	res.setHeader('Access-Control-Allow-Origin', req.header('origin'));

// 	res.setHeader(
// 		'Access-Control-Allow-Methods',
// 		'POST, OPTIONS, GET, PUT, UPDATE, DELETE'
// 	);

// 	// Request headers you wish to allow
// 	res.setHeader(
// 		'Access-Control-Allow-Headers',
// 		'X-Requested-With,content-type'
// 	);

// 	// Set to true if you need the website to include cookies in the requests sent
// 	// to the API (e.g. in case you use sessions)
// 	res.setHeader('Access-Control-Allow-Credentials', true);

// 	// Pass to next layer of middleware
// 	next();
// });

app.use('/api/auth/', userRoutes);
app.use('/api/messages/', messageRoutes);

module.exports = app;
