const mongoose = require('mongoose');

const connectToDB = () => {
	const connectionString = process.env.CONNECTION_STRING;
	if (!connectionString) {
		console.error('connection string is undefined');
		process.exit(1);
	}
	const db = mongoose.connection;
	db.on('connected', () => {
		const halfLength = Math.ceil(connectionString.length / 2);
		const displayString = connectionString.substring(0, halfLength) + ' ...';
		console.log(`DB connected, ${displayString}`);
	});
	db.on('error', (error) => {
		console.error(error);
		process.exit(2);
	});
	db.on('disconnected', () => {
		console.log('db disconnected');
	});
	return mongoose.connect(connectionString);
};

module.exports = connectToDB;
