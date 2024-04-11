const express = require("express");
const router = express.Router();
const PlantEvent = require("../models/PlantEvent");
const Device = require("../models/Device");

// @route GET
// @description Get all events
router.get("/", (req, res) => {
  Device.findOne({ deviceId: req.params.deviceId }).then((identity) => {
    //add permission by deviceid
    console.log(identity);
    PlantEvent.find()
      .then((PlantEvents) => res.json(PlantEvents))
      .catch((err) =>
        res.status(404).json({ noplanteventsfound: "No Events found" }),
      );
  });
});

// @route POST
// @description add/save event to DB, needs deviceId
// @access Public
router.post("/", (req, res) => {
  Device.findOne({ deviceId: req.params.deviceId }).then((identity) => {
    //add permission by deviceid
    console.log(identity);
    PlantEvent.create(req.body)
      .then(res.json({ msg: "Event added successfully" }))
      .catch((err) =>
        res.status(400).json({ error: "Unable to add this event" }),
      );
  });
});
