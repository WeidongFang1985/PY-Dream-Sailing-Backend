const users = require("../../controllers/users");
const {Router} = require("express");
const userValidation = require("../../validators/userValidation");
const userRouter = Router();

userRouter.get('/users', users.index);
userRouter.post('/users/login', userValidation.login,users.login);
//Edit Password
userRouter.post('/users/password',users.password);


module.exports = userRouter;
