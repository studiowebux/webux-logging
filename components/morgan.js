// ███╗   ███╗██╗██████╗ ██████╗ ██╗     ███████╗██╗    ██╗ █████╗ ██████╗ ███████╗
// ████╗ ████║██║██╔══██╗██╔══██╗██║     ██╔════╝██║    ██║██╔══██╗██╔══██╗██╔════╝
// ██╔████╔██║██║██║  ██║██║  ██║██║     █████╗  ██║ █╗ ██║███████║██████╔╝█████╗
// ██║╚██╔╝██║██║██║  ██║██║  ██║██║     ██╔══╝  ██║███╗██║██╔══██║██╔══██╗██╔══╝
// ██║ ╚═╝ ██║██║██████╔╝██████╔╝███████╗███████╗╚███╔███╔╝██║  ██║██║  ██║███████╗
// ╚═╝     ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

/**
 * File: morgan.js
 * Author: Tommy Gingras
 * Date: 2019-05-25
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const morgan = require("morgan");
const json = require("morgan-json");

morgan.token("body", function(req, res) {
  return JSON.stringify(req.body);
});
morgan.token("params", function(req, res) {
  return JSON.stringify(req.params);
});
morgan.token("query", function(req, res) {
  return JSON.stringify(req.query);
});
morgan.token("headers", function(req, res) {
  return JSON.stringify(req.headers);
});
morgan.token("type", function(req, res) {
  return req.headers["content-type"];
});
morgan.token("language", function(req, res) {
  return req.headers["accept-language"];
});

const jsonFormat = json({
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
});

module.exports = (log, options) => {
  if (options.type === "json") {
    try {
      return morgan(jsonFormat, {
        // combined, tiny, dev, common, short, json
        stream: log.stream
      });
    } catch (e) {
      console.error(e);
    }
  } else {
    try {
      return morgan(options.type, {
        // combined, tiny, dev, common, short
        stream: log.stream
      });
    } catch (e) {
      console.error(e);
    }
  }
};
