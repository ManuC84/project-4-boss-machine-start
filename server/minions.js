const express = require("express");
const app = require("../server");
const minionsRouter = express.Router();

const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require("./db");

//Get all minions
minionsRouter.get("/", (req, res) => {
  const allMinions = getAllFromDatabase("minions");
  res.send(allMinions);
});

//Create new minion
minionsRouter.post("/", (req, res) => {
  const newMinion = addToDatabase("minions", req.body);
  res.status(201).send(newMinion);
});

//Get minion by ID
minionsRouter.get("/:minionId", (req, res) => {
  const minionId = req.params.minionId;
  const getMinionById = getFromDatabaseById("minions", minionId);
  if (typeof Number(minionId) !== "number" || !getMinionById) {
    res.sendStatus(404);
  } else {
    res.send(getMinionById);
  }
});

module.exports = minionsRouter;
