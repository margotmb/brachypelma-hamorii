const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deviceSchema = new Schema(
  {
    deviceId: {
      type: String,
      required: true,
    },
  },
  { collection: "devices" },
);

module.exports = Device = mongoose.model("Device", deviceSchema);
