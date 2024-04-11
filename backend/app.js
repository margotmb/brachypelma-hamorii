const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//ConnectDB
const mongoose = require("mongoose");
mongoose.connect(
  (process.env.MONGODB_URI = ""),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "planteventlog",
  },
  console.log("CONNECTED"),
);

// Sessions Middleware Configuration
const store = new MongoDBStore({
  uri: "",
  collection: "sessions",
});

app.use(
  session({
    secret: "",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    store: store,
  }),
);

// routes
const plantevents = require("./routes/plantevents");
const sessions = require("./routes/sessions");

app.use("/plantevents", plantevents);
app.use("/sessions", sessions);

app.get("/", (req, res) => {
  res.send("hello world");
});
//PORT SET
var port = 5000;
module.exports = app;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
