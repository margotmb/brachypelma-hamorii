const express = require("express");
const router = express.Router();
const PlantEvent = require("../models/PlantEvent");

// @route GET
// @description Get all events from current device id
router.get("/", (req, res) => {
  PlantEvent.find({ deviceId: req.params.deviceId })
    .then((PlantEvents) => res.json(PlantEvents))
    .catch((err) =>
      res.status(404).json({ noplanteventsfound: "No Events found" }),
    );
});

// @route POST
// @description add/save event to DB, needs deviceId
// @access Public -> Create Collection for Device Permission
// Check if device is on the database, deviceId stays on cookie for querys and checks
router.post("/", (req, res) => {
  PlantEvent.create(req.body)
    .then(res.json({ msg: "Event added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this event" }),
    );
});

module.exports = router;
