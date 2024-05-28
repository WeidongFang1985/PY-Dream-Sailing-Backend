const {Schema, model} = require('mongoose');

const schema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
	}
)

module.exports = model('Admin', schema, 'Admin');
