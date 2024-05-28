const {Schema, model} = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const schema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			trim: true,
			unique: true,
			required: 'Email address is required',
			validate: [isEmail, 'invalid email'],
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
		},
		contact_number: {
			type: String,
		},
		is_business: {
			type: Boolean,
			required: true,
		},
		campaigns: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Campaign',
			}
		],
		},
		{
			timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
		}
)

schema.methods.hashPassword = async function () {
	this.password = await bcrypt.hash(this.password, 12);
};

schema.methods.validatePassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

schema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();
	userObject.id = userObject._id;
	delete userObject._id;
	delete userObject.password;
	delete userObject.tokens;
	delete userObject.refreshToken;
	return userObject;
};

module.exports = model('User', schema, 'User');
