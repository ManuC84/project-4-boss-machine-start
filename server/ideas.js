const express = require("express");
const app = require("../server");
const ideasRouter = express.Router();
const checkMillionDollarIdea = require("./checkMillionDollarIdea");

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

//Create new idea
ideasRouter.post("/", checkMillionDollarIdea, (req, res) => {
  const newIdea = addToDatabase("ideas", req.body);
  res.status(201).send(newIdea);
});

//Get idea by ID
ideasRouter.get("/:ideaId", (req, res) => {
  const ideaId = req.params.ideaId;
  const getIdeaById = getFromDatabaseById("ideas", ideaId);
  if (typeof Number(ideaId) !== "number" || !getIdeaById) {
    res.sendStatus(404);
  } else {
    res.status(200).send(getIdeaById);
  }
});

//Update idea by ID
ideasRouter.put("/:ideaId", (req, res) => {
  const ideaId = req.params.ideaId;
  const ideaInstance = req.body;
  const updatedIdea = updateInstanceInDatabase("ideas", ideaInstance);
  if (typeof Number(ideaId) !== "number" || !updatedIdea) {
    res.sendStatus(404);
  } else {
    res.send(updatedIdea);
  }
});

//Delete idea by ID
ideasRouter.delete("/:ideasId", (req, res) => {
  const ideasId = req.params.ideasId;
  const deleteIdea = deleteFromDatabasebyId("ideas", ideasId);
  if (typeof Number(ideasId) !== "number" || !deleteIdea) {
    res.sendStatus(404);
  } else {
    res.sendStatus(204);
  }
});
module.exports = ideasRouter;
