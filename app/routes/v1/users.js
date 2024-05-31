const users = require("../../controllers/users");
const {Router} = require("express");
const authGuard = require("../../middleware/authGuards");
const userValidation = require("../../validators/userValidation");
const userRouter = Router();

userRouter.get('/users', authGuard, users.index);
userRouter.post('/users', userValidation.register,users.register);
userRouter.post('/users/login', userValidation.login,users.login);
userRouter.get('/users/:id', authGuard, users.show);
//Edit Password
userRouter.post('/users/password',users.password);


module.exports = userRouter;
