const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, min: 3, max: 20, unique: true },
	email: { type: String, required: true, unique: true, max: 50 },
	password: { type: String, required: true, min: 5, select: false },
	isAvatarImageSet: { type: Boolean, default: false },
	avatarImage: { type: String, default: '' },
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = bcrypt.hashSync(this.password, 11);
	return next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;
