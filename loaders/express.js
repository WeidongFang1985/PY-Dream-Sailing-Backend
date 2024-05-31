const express = require("express");
const cors = require("cors");
const config = require('../app/config')
const connectToDB = require("../app/utils/db");
const userRouter = require("../app/routes/v1/users");
const campaignRouter = require("../app/routes/v1/campaigns");
const adminRouter = require("../app/routes/v1/admins");
const companyRouter = require("../app/routes/v1/companies");
const authTokenRouter = require("../app/routes/v1/authToken");
const uploadRouter = require("../app/routes/v1/upload");

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
	app.use(config.api.prefix, userRouter);
	app.use(config.api.prefix, campaignRouter);
	app.use(config.api.prefix, adminRouter);
	app.use(config.api.prefix, companyRouter);
	app.use(config.api.prefix, authTokenRouter);
	app.use(config.api.prefix, uploadRouter);

	return app;
}
