const {Router} = require("express");
const authToken = require("../../controllers/authToken");
const authTokenRouter = Router();

authTokenRouter.post("/auth",authToken.auth)

module.exports = authTokenRouter;