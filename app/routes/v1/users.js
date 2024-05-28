const users = require("../../controllers/users");
const {Router} = require("express");
// const userValidation = require("../../validators/userValidation");
const userRouter = Router();

userRouter.get('/users', users.index);


module.exports = userRouter;
