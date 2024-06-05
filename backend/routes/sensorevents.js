const express = require("express");
const router = express.Router();
const SensorEvent = require("../models/SensorEvent");

// @route GET
// @description Get all events from current device id
router.get("/:deviceId", (req, res) => {
  console.log(req.params);
  SensorEvent.find({ deviceId: req.params.deviceId })
    .then((SensorEvents) => res.json(SensorEvents))
    .catch((err) =>
      res.status(404).json({ nosensoreventsfound: "No Events found" }),
    );
});

// @route POST
// @description add/save event to DB, needs deviceId
// @access Public -> Create Collection for Device Permission
// Check if device is on the database for posting
router.post("/", (req, res) => {
  SensorEvent.create(req.body)
    .then((SensorEvents) =>
      res.json({ event: SensorEvents, msg: "Event added successfully" }),
    )
    .catch((err) =>
      res
        .status(400)
        .json({ erro_desc: err, error: "Unable to add this event" }),
    );
});

module.exports = router;
