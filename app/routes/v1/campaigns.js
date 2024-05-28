const campaigns = require("../../controllers/campaigns");
const {Router} = require("express");
// const authGuard = require("../../middleware/authGuards");
const campaignRouter = Router();

campaignRouter.get('/campaigns', campaigns.index);

module.exports = campaignRouter;
