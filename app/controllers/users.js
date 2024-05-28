const UserModel = require('../models/user');
const {generateToken} = require('../utils/jwt');
const {validationResult} = require("express-validator");

// GET localhost:8080/api/v1/users
exports.index = async (req, res) => {
	// const users = await UserModel.find().populate('campaigns').exec();
	const users = await UserModel.find().exec();

	res.json(users);
}
