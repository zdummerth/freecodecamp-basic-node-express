require("dotenv").config();
let express = require("express");
let app = express();

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

app.use("/public", express.static(__dirname + "/public"));

module.exports = app;
