const admins = require("../../controllers/admins");
const {Router} = require("express");
const adminRouter = Router();

adminRouter.get('/admins', admins.index);
adminRouter.post('/admins/login', admins.login);
adminRouter.post('/admins/review', admins.review);




module.exports = adminRouter;
