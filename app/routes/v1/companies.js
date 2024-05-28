const companies = require("../../controllers/companies");
const {Router} = require("express");
const companyRouter = Router();

companyRouter.get('/companies', companies.index);


module.exports = companyRouter;
