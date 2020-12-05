const express = require("express");
const app = require("../server");
const apiRouter = express.Router();
const ideasRouter = require("./ideas");
const meetingsRouter = require("./meetings");
const minionsRouter = require("./minions");
const workRouter = require("./work");

apiRouter.use("/ideas", ideasRouter);
apiRouter.use("/minions", minionsRouter);
apiRouter.use("/meetings", meetingsRouter);
apiRouter.use("/minions", workRouter);

module.exports = apiRouter;
