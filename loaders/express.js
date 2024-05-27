const express = require("express");
const cors = require("cors");
const config = require('../app/config')
const connectToDB = require("../app/utils/db");

const startServer = async () => {
	const application = express();

	application.listen(config.port, err => {
		if (err) {
			console.log(err)
			process.exit(1)
		}
		console.log("SERVER STARTED")
	})

	try {
		await connectToDB();
	} catch (error) {
		console.error('Failed to connect to database:', error);
		process.exit(2);
	}

	return application;
}

module.exports = async () => {
	const app = await startServer();
	app.use(cors());
	app.use(express.json());

	return app;
}
