const CompanyModel = require('../models/company')

// Find all companies with user detail
exports.index = async (req, res) => {
	const companies = await CompanyModel.find().populate(
		'stakeholder',
		{avatar: 1, username: 1, is_business: 1})
		.exec();
	res.json(companies)
}
