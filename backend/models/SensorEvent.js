const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const sensorEventSchema = new Schema(
  {
    sensorMoisture: {
      type: Number,
      required: true,
    },
    sensorTemp: {
      type: Number,
      required: true,
    },
    sensorLight: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true
    },
  },
  { collection: "sensorevents" },
);

module.exports = SensorEvent = mongoose.model("SensorEvent", sensorEventSchema);
