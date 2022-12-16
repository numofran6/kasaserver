const User = require('../model/userModel');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;

		const usernameCheck = await User.findOne({ username });
		if (usernameCheck) {
			return res.json({ msg: 'Username already in use', status: false });
		}
		const emailCheck = await User.findOne({ email });
		if (emailCheck) {
			return res.json({ msg: 'Email already in use', status: false });
		}
		const user = await User.create({ email, username, password });

		const userInfo = {
			avatarImage: user.avatarImage,
			email: user.email,
			isAvatarImageSet: user.isAvatarImageSet,
			username: user.username,
			id: user._id,
		};
		return res.json({ status: true, userInfo });
	} catch (err) {
		next(err);
	}
};

module.exports.login = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username }).select('+password');
		if (!user || !bcrypt.compareSync(password, user.password)) {
			return res
				.header('Access-Control-Allow-Origin', 'https://kasachat.vercel.app')
				.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
				.json({ msg: 'Incorrect username or password', status: false });
		}

		const userInfo = {
			avatarImage: user.avatarImage,
			email: user.email,
			isAvatarImageSet: user.isAvatarImageSet,
			username: user.username,
			id: user._id,
		};
		return res
			.header('Access-Control-Allow-Origin', 'https://kasachat.vercel.app')
			.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
			.json({ status: true, userInfo });
	} catch (err) {
		next(err);
	}
};

module.exports.setAvatar = async (req, res, next) => {
	try {
		const userId = req.params.id;
		const avatarImage = req.body.image;
		const userData = await User.findByIdAndUpdate(userId, {
			isAvatarImageSet: true,
			avatarImage,
		});

		return res.json({
			isSet: userData.isAvatarImageSet,
			image: userData.avatarImage,
		});
	} catch (err) {
		next(err);
	}
};

module.exports.getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find({ _id: { $ne: req.params.id } }).select([
			'email',
			'username',
			'avatarImage',
			'_id',
		]);
		return res.json(users);
	} catch (err) {
		next(err);
	}
};
