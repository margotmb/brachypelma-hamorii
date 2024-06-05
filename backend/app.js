const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//ConnectDB
const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "spiderdb_margot",
  },
  console.log("CONNECTED"),
);

// routes
const sensorevents = require("./routes/sensorevents");

app.use("/sensorevents", sensorevents);

app.get("/", (req, res) => {
  res.send("hello world");
});
//PORT SET
var port = 5000;
module.exports = app;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
