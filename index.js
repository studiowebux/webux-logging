// ██╗      ██████╗  ██████╗  ██████╗ ██╗███╗   ██╗ ██████╗
// ██║     ██╔═══██╗██╔════╝ ██╔════╝ ██║████╗  ██║██╔════╝
// ██║     ██║   ██║██║  ███╗██║  ███╗██║██╔██╗ ██║██║  ███╗
// ██║     ██║   ██║██║   ██║██║   ██║██║██║╚██╗██║██║   ██║
// ███████╗╚██████╔╝╚██████╔╝╚██████╔╝██║██║ ╚████║╚██████╔╝
// ╚══════╝ ╚═════╝  ╚═════╝  ╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝

/**
 * File: index.js
 * Author: Tommy Gingras
 * Date: 2019-06-20
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

/**
 * this function logs the request contents. Actually this is only a morgan wrapper.
 * @param {Object} options The options, the configuration of the logging module, mandatory
 * @param {Function} app The app, an express function, mandatory
 * @param {Object} log The log function, optional
 * @return {VoidFunction} return nothing
 */
const onRequest = (options, app, log = console) => {
  log.info("Webux-logging - Configuring the `on request` handler");

  app.use(require("./lib/morgan")(options, log));
  log.info("Webux-logging - Request handler loaded");
};

/**
 * this function logs the response, for now it does nothing ...
 * @param {Object} options The options, the configuration of the logging module, mandatory
 * @param {Function} app The app, an express function, mandatory
 * @param {Object} log The log function, optional
 * @return {VoidFunction} return nothing
 */
const onResponse = (options, app, log = console) => {
  // for now we will not log the responses
  log.info("Webux-logging - Configuring the `on response` handler");
  log.info("Webux-logging - Response handler loaded");
};

module.exports = {
  onRequest,
  onResponse
};
