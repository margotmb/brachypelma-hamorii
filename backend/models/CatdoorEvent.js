const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const catdoorSchema = new Schema({
  deviceId: {
    type: String,
    required: true
  },
  img_link: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
}, { collection: 'catdoorlog' });
 
module.exports = CatdoorEvent = mongoose.model("CatdoorEvent", cardSchema);
