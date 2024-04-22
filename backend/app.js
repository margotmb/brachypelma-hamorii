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
    dbName: "planteventlog",
  },
  console.log("CONNECTED"),
);

// routes
const plantevents = require("./routes/plantevents");

app.use("/plantevents", plantevents);

app.get("/", (req, res) => {
  res.send("hello world");
});
//PORT SET
var port = 5000;
module.exports = app;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
