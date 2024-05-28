const {Schema, model} = require('mongoose');

const schema = new Schema(
	{
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		photo: {
			type: String,
			required: true,
		},
		category:{
			type:String,
			required: true,
		},
		is_approved: {
			type: String,
		},
	},
	{
		timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
	}
)

module.exports = model('Campaign', schema, 'Campaign')
