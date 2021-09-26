const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3001;
// const MONGODB_URI =
//   process.env.MONGODB_URI || "mongodb://localhost:3001/budget";

//carinvid:<password>@cluster0.ygwwm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//FUhyM45VpNNkuf0B

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://@cluster0.ygwwm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/budget",
  {
    dbName: "budget",
    user: "carinvid",
    pass: "FUhyM45VpNNkuf0B",
    useNewUrlParser: true,
    useFindAndModify: false,
  }
);

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
