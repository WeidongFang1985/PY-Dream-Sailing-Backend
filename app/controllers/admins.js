const AdminModel = require('../models/admin');
const {generateToken} = require('../utils/jwt');

// Get All Admins - localhost:8080/api/v1/admins
exports.index = async (req, res) => {
	try {
		const admins = await AdminModel.find().exec();
		res.json(admins);
	} catch (error) {
		res.status(500).json({ message: "Error accessing the database", error: error.message });
	}
}

// Admin login - localhost:8080/api/v1/admins/login
exports.login = async (req, res) => {
	const { username, password } = req.body;
	try {
		if (!username || !password) {
			res.status(422).json("Username and password are required");
			return;
		}
		const admin = await AdminModel.findOne({ username }).exec();
		if (!admin || admin.password !== password) {
			res.status(401).json('Invalid username or password');
			return;
		}
		const token = generateToken({ id: admin.id, username });
		res.status(200).json({ id: admin.id, token });
	} catch (error) {
		res.status(500).json({ message: "An error occurred during login", error: error.message });
	}
}
