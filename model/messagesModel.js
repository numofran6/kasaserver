const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
	{
		message: {
			text: { type: String, required: true },
		},
		users: Array,
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Messages =
	mongoose.models.Message || mongoose.model('Message', messageSchema);

module.exports = Messages;
