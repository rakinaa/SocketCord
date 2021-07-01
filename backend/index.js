const express = require("express");
const mongoose = require("mongoose");
const app = express();

const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const passport = require("passport");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log(err));

app.use("/api/users", users);
app.use(passport.initialize());
require("./config/passport")(passport);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`));
