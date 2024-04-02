const express = require('express');
const router = express.Router();
const CatdoorEvent = require('../models/CatdoorEvent');

// Need Set Permissions, only admin can manipulate

// @route GET 
// @description Get all events
router.get('/', (req, res) => {
    CatdoorEvent.find()
      .then(CatdoorEvents => res.json(CatdoorEvents))
      .catch(err => res.status(404).json({ nocatdooreventsfound: 'No Events found' }));
  });

// @route POST
// @description add/save event to DB, needs deviceId, picture and timestamp
// @access Public
router.post('/', (req, res) => {
  CatdoorEvent.create(req.body)
    .then(res.json({ msg: 'Event added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this event' }));
});
