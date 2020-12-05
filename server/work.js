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

//check workId
workRouter.param("workId", (req, res, next, id) => {
  const checkId = getFromDatabaseById("work", id);
  if (!isNaN(id) && checkId) {
    req.workId = id;
    next();
  } else {
    res.sendStatus(404);
  }
});
//check minionId
workRouter.param("minionId", (req, res, next, id) => {
  const checkId = getFromDatabaseById("minions", id);
  if (!isNaN(id) && checkId) {
    req.minionId = id;
    next();
  } else {
    res.sendStatus(404);
  }
});

//get all work
workRouter.get("/:minionId/work", (req, res) => {
  const minionId = req.params.minionId;
  const workArr = getAllFromDatabase("work");
  const filteredArr = workArr.filter((work) => work.minionId === minionId);
  if (isNaN(minionId)) {
    res.sendStatus(404);
  } else {
    res.status(200).send(filteredArr);
  }
});

//create new work
workRouter.post("/:minionId/work", (req, res) => {
  const newWork = addToDatabase("work", req.body);
  console.log(newWork);
  res.status(201).send(newWork);
});

//update work
workRouter.put("/:minionId/work/:workId", (req, res) => {
  const workInstance = req.body;
  const workId = req.params.workId;
  const minionId = req.params.minionId;
  if (minionId !== workInstance.minionId) {
    res.sendStatus(400);
  } else {
    const updateWork = updateInstanceInDatabase("work", workInstance);
    res.status(201).send(updateWork);
  }
});

//delete work
workRouter.delete("/:minionId/work/:workId", (req, res) => {
  const workId = req.workId;
  const deleteWork = deleteFromDatabasebyId("work", workId);
  if (!deleteWork) {
    res.sendStatus(400);
  } else {
    res.sendStatus(204);
  }
});

module.exports = workRouter;
