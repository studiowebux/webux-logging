const webuxLogging = require("../index");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const options = {
  type: "json", // combined, tiny, dev, common, short, json
  blacklist: ["password", "accessToken", "refreshToken"],
  format: {
    method: ":method",
    url: ":url",
    status: ":status",
    body: ":body",
    params: ":params",
    query: ":query",
    headers: ":headers",
    "http-version": ":http-version",
    "remote-ip": ":remote-addr",
    "remote-user": ":remote-user",
    length: ":res[content-length]",
    referrer: ":referrer",
    "user-agent": ":user-agent",
    "accept-language": ":language",
    "response-time": ":response-time ms"
  }
};

webuxLogging.onRequest(options, app);
webuxLogging.onResponse(options, app);

console.log("webux-logging loaded !");

app.use(
  bodyParser.json({
    limit: "10MB"
  })
);

app.use("*", (req, res) => {
  res.send("BONJOUR !");
});

app.listen(1337);
