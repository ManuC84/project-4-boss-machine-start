const express = require("express");
const app = require("../server");
const ideasRouter = express.Router();

const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require("./db");

//Get all ideas
ideasRouter.get("/", (req, res) => {
  const allIdeas = getAllFromDatabase("ideas");
  res.send(allIdeas);
});

module.exports = ideasRouter;
