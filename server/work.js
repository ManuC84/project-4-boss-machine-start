const express = require("express");
const app = require("../server");
const workRouter = express.Router();

const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require("./db");

workRouter.get("/:minionId/work", (req, res) => {
  const minionId = req.params.minionId;
  const workArr = getFromDatabaseById("work", minionId);
  if (!isNaN(minionId) && workArr) {
    res.status(200).send([workArr]);
  } else {
    res.sendStatus(404);
  }
});

workRouter.post("/:minionId/work", (req, res) => {
  const newWork = addToDatabase("work", req.body);
  res.status(201).send(newWork);
});

workRouter.put("/:minionId/work/:workId", (req, res) => {
  const workInstance = req.body;
  const workId = req.params.workId;
  const minionId = req.params.minionId;
  const idCheck = getFromDatabaseById("work", workId);
  if (workId !== minionId) {
    res.sendStatus(400);
  } else if (isNaN(workId) || !idCheck) {
    res.sendStatus(404);
  } else {
    const updateWork = updateInstanceInDatabase("work", workInstance);
    res.send(updateWork);
  }
});

workRouter.delete("/:minionId/work/:workId", (req, res) => {
  const workId = req.params.workId;
  const deleteWork = deleteFromDatabasebyId("work", workId);
  if (!deleteWork || isNaN(workId)) {
    res.sendStatus(404);
  } else {
    deleteWork;
    res.sendStatus(204);
  }
});

module.exports = workRouter;
