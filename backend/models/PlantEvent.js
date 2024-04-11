const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantEventSchema = new Schema(
  {
    moistureLevelDesc: {
      type: String,
      required: true,
    },
    moistureLevelInt: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "planteventlog" },
);

module.exports = PlantEvent = mongoose.model("PlantEvent", plantEventSchema);
