const campaigns = require("../../controllers/campaigns");
const {Router} = require("express");
const authGuard = require("../../middleware/authGuards");
const campaignRouter = Router();

campaignRouter.get('/campaigns', campaigns.index);
campaignRouter.post('/campaigns', authGuard, campaigns.store);

module.exports = campaignRouter;
