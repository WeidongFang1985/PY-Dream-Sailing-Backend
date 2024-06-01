const CampaignModel = require('../models/campaign')
const UserModel = require('../models/user')

// Find all campaigns with user detail
exports.index = async (req, res) => {
	const campaigns = await CampaignModel.find().populate(
		'author',
		{avatar: 1, username: 1, is_business: 1})
		.sort({created_at: -1})
		.exec();
	res.json(campaigns)
}

// Create a campaign
exports.store = async (req, res) => {
	const {author, title, content, photo, category} = req.body;
	const is_approved = "pending";
	const campaign = new CampaignModel({author, title, content, photo, category, is_approved});
	try {
		const savedCampaign = await campaign.save();
		await UserModel.findByIdAndUpdate(
			author,
			{
				$push: {
					campaigns: savedCampaign._id
				}
			}
		)
		await campaign.save();
		res.status(201).json(campaign)
	} catch (e) {
		res.status(400).json({message:'Lack of information'})
	}
}
