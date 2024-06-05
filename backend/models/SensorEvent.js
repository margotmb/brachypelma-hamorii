const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sensorEventSchema = new Schema(
  {
    deviceId: {
      type: String,
      required: true,
    },
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
      default: Date.now,
    },
  },
  { collection: "sensorevents" },
);

module.exports = SensorEvent = mongoose.model("SensorEvent", sensorEventSchema);
