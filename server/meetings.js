const express = require("express");
const app = require("../server");
const meetingsRouter = express.Router();

const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require("./db");

//Get all meetings
meetingsRouter.get("/", (req, res) => {
  const allMeetings = getAllFromDatabase("meetings");
  res.send(allMeetings);
});

//Create new meeting
meetingsRouter.post("/", (req, res) => {
  const newMeeting = addToDatabase("meetings", createMeeting());
  res.status(201).send(newMeeting);
});

//Delete all meetings
meetingsRouter.delete("/", (req, res) => {
  deleteAllFromDatabase("meetings");
  res.sendStatus(204);
});

module.exports = meetingsRouter;
