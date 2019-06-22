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

const onRequest = (app, log, options) => {
  app.use(require("./components/morgan")(log, options));
};

const onResponse = (app, log) => {
  // for now we will not log the responses
};

module.exports = {
  onRequest,
  onResponse
};
