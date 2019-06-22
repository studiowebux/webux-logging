const webuxLogging = require("../index");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { logger, options } = require("./helpers");

webuxLogging.onRequest(app, logger, options);
webuxLogging.onResponse(app, logger);

app.use(
  bodyParser.json({
    limit: "10MB"
  })
);

app.use("*", (req, res) => {
  res.send("BONJOUR !");
});

app.listen(1337);
