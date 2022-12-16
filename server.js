const mongoose = require('mongoose');
const socket = require('socket.io');
const app = require('./index');
require('dotenv').config({ path: './.env' });

// DB Connection
mongoose.set('strictQuery', false);
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('DB Connected'))
	.catch((err) => console.log({ err }));

// Server Connection
const server = app.listen(process.env.PORT, () => {
	console.log(`Server Started on port ${process.env.PORT}`);
});

// SOCKET Connection
const io = new socket.Server(server, {
	cors: {
		origin: 'https://kasachat.vercel.app',
		credentials: true,
	},
});

global.onlineUsers = new Map();
io.on('connection', (socket) => {
	console.log('Socket connected');
	global.chatSocket = socket;
	socket.on('add-user', (userId) => {
		onlineUsers.set(userId, socket.id);
	});

	socket.on('send-msg', (data) => {
		const sendUserSocket = onlineUsers.get(data.to);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit('msg-recieve', data.message);
		}
	});
});
