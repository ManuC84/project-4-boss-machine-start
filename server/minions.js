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

//Update minion by ID
minionsRouter.put("/:minionId", (req, res) => {
  const minionId = req.params.minionId;
  const minionInstance = req.body;
  const updateMinionById = updateInstanceInDatabase("minions", minionInstance);
  if (typeof Number(minionId) !== "number" || !updateMinionById) {
    res.sendStatus(404);
  } else {
    res.send(updateMinionById);
  }
});

//Delete Minion by ID
minionsRouter.delete("/:minionId", (req, res) => {
  const minionId = req.params.minionId;
  const deleteMinion = deleteFromDatabasebyId("minions", minionId);
  if (typeof Number(minionId) !== "number" || !deleteMinion) {
    res.sendStatus(404);
  } else {
    deleteFromDatabasebyId("minions", minionId);
    res.sendStatus(204);
  }
});

module.exports = minionsRouter;
