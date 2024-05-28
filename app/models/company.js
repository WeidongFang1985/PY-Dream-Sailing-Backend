const {Schema, model} = require('mongoose');

const schema = new Schema(
	{
		stakeholder: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		company_name: {
			type: String,
		},
		description: {
			type: String,
		},
		service: {
			type: String,
		},
		photo: {
			type: String,
		},
	},
	{
		timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
	}
)

module.exports = model('Company', schema, 'Company')
