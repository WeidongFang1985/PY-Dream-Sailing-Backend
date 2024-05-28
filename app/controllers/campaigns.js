const CampaignModel = require('../models/campaign')
// const UserModel = require('../models/user')

// Find all campaigns with user detail
exports.index = async (req, res) => {
	const campaigns = await CampaignModel.find().populate(
		'author',
		{avatar: 1, username: 1, is_business: 1})
		.sort({created_at: -1})
		.exec();
	res.json(campaigns)
}
