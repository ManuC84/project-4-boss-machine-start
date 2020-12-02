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

module.exports = meetingsRouter;
