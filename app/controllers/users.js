const UserModel = require('../models/user');
const {generateToken} = require('../utils/jwt');
const {validationResult} = require("express-validator");

// GET localhost:8080/api/v1/users
exports.index = async (req, res) => {
	const users = await UserModel.find().populate('campaigns').exec();
	res.json(users);
}

// Login
// POST localhost:8080/api/v1/users/login
exports.login = async (req, res) => {
	const {email, password} = req.body
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).json({errors: errors})
		return
	}
	const user = await UserModel.findOne({email}).exec()
	if (!user) {
		res.status(404).json({error: 'The email address you entered does not exist'});
		return;
	}

	if (!await user.validatePassword(password)) {
		res.status(401).json({error: 'Invalid email or password'});
		return;
	}
	const token = generateToken({id: user.id, email});
	const id = user.id;
	res.status(201).json({id, token});
}


// Edit Password:
exports.password = async (req, res) => {
	const { email, password } = req.body;

	try {
		let user = await UserModel.findOne({ email });
		if (!user) {
			user = new UserModel({ email, password });
		} else {
			user.password = password;
		}
		await user.hashPassword();
		await user.save();
		res.status(201).json("User registered or password updated");
	} catch (error) {
		res.status(500).json({ message: "An error occurred", error: error.message });
	}
};

// Login
// POST localhost:8080/api/v1/users
exports.register = async (req, res) => {
	const {email, password, username, is_business} = req.body;
	const avatar = "https://py-uploadimages.s3.ap-southeast-2.amazonaws.com/user.svg";

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).json({errors: errors})
		return
	}
	if (await UserModel.findOne({username}).exec()) {
		res.status(409).send(`Username already exists.`)
		return;
	}

	if (await UserModel.findOne({email}).exec()) {
		res.status(409).send(`E-mail already exists.`)
		return;
	}

	const user = new UserModel({username, email, password, is_business, avatar});
	await user.hashPassword();
	await user.save();
	const token = generateToken({id: user.id, email});
	const id = user.id;
	res.status(201).json({id, token});
}

// Show one user
// GET localhost:8080/api/v1/users/:id
exports.show = async (req, res) => {
	const {id} = req.params;
	const user = await UserModel.findById(id).populate({
		path: 'campaigns',
		options: { sort: { 'created_at': -1 } }
	}).exec();
	if (!user) {
		res.status(404).json({error: "User not exist"})
		return
	}
	res.json(user)
}
