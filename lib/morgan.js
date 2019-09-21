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

// token definitions
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

/**
 * this function call the stream function of winston, it sends the req contents.
 * @param {Object} options The options, the configuration of the logging module, mandatory
 * @param {Object} log The log function, optional
 * @return {VoidFunction} return nothing
 */
module.exports = (options, log = console) => {
  log.info("Webux-logging - Configuring morgan");

  if (options.type === "json") {
    try {
      return morgan(json(options.format), {
        // combined, tiny, dev, common, short, json
        stream: log.stream
      });
    } catch (e) {
      log.error("Webux-logging - " + e.message);
    }
  } else {
    try {
      return morgan(options.type, {
        // combined, tiny, dev, common, short
        stream: log.stream
      });
    } catch (e) {
      log.error("Webux-logging - " + e.message);
    }
  }
};
