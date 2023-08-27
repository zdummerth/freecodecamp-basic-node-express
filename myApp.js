require("dotenv").config();
let express = require("express");
let app = express();

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path} - ${req.ip}`);
//   next();
// });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  let message = "Hello json";
  console.log("message style: ", process.env.MESSAGE_STYLE);
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message });
});

const nowMiddleware = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

app.get("/now", nowMiddleware, (req, res) => {
  res.json({
    time: req.time,
  });
});

app.get("/:word/echo", (req, res) => {
  res.json({
    echo: req.params.word,
  });
});

app.use("/public", express.static(__dirname + "/public"));

module.exports = app;
