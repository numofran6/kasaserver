const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
app.use(cors({ credentials: true }));
app.use(express.json());

app.use('/api/auth/', userRoutes);
app.use('/api/messages/', messageRoutes);

module.exports = app;
