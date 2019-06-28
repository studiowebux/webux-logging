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
  if (!options || typeof options !== 'object') {
    throw new Error("The options parameter is required and must be an object");
  }
  if (!app || typeof app !== 'function') {
    throw new Error("The app parameter is required and must be an express function");
  }
  if (log && typeof log !== 'object') {
    throw new Error("The log parameter must be an object")
  }

  log.info("Configuring the on request handler")
  
  app.use(require("./components/morgan")(options, log));
  log.info("Request handler loaded")
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
  log.info("Configuring the on response handler")
  log.info("Response handler loaded")

};

module.exports = {
  onRequest,
  onResponse
};
