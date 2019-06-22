const { createLogger, format, transports } = require("winston");
const { combine, timestamp, simple } = format;
const _ = require("lodash");

const options = {
  blacklist: ["password"],
  // combined, tiny, dev, common, short, json
  type: "json"
};

const hasBlacklist = (object, parent, child, find) => {
  if (
    typeof parent[child] === "object" &&
    Object.keys(parent[child]).length > 0
  ) {
    object[child] = {};
    Object.keys(parent[child]).forEach(element => {
      hasBlacklist(object[child], parent[child], element, find);
    });
  } else {
    if (child === find) {
      parent[child] = "*****";
    }
    object[child] = parent[child];
  }

  return object;
};

function isJSON(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    // console.error(e);
    return false;
  }
}

const filterSecret = options => {
  return format((info, opts) => {
    let cleaned = {
      body: {},
      headers: {},
      params: {}
    };

    if (options.blacklist && info.message) {
      let parsedMessage =
        typeof info.message === "string"
          ? JSON.parse(info.message)
          : info.message;
      const Body = isJSON(parsedMessage.body || "")
        ? JSON.parse(parsedMessage.body)
        : {};
      const Headers = isJSON(parsedMessage.headers || "")
        ? JSON.parse(parsedMessage.headers)
        : {};
      const Params = isJSON(parsedMessage.params || "")
        ? JSON.parse(parsedMessage.params)
        : {};

      options.blacklist.forEach(blacklist => {
        if (parsedMessage.body) {
          Object.keys(Body).forEach(body => {
            hasBlacklist(cleaned.body, Body, body, blacklist);
          });
        }
        if (parsedMessage.headers) {
          Object.keys(Headers).forEach(header => {
            hasBlacklist(cleaned.headers, Headers, header, blacklist);
          });
        }
        if (parsedMessage.params) {
          Object.keys(Params).forEach(param => {
            hasBlacklist(cleaned.params, Params, param, blacklist);
          });
        }
      });

      _c = parsedMessage;
      if (cleaned && !_.isEmpty(cleaned)) {
        if (cleaned.body && !_.isEmpty(cleaned.body)) {
          _c.body = cleaned.body;
        }
        if (cleaned.params && !_.isEmpty(cleaned.params)) {
          _c.params = cleaned.params;
        }
        if (cleaned.headers && !_.isEmpty(cleaned.headers)) {
          _c.headers = cleaned.headers;
        }
      }

      info.message = JSON.stringify(_c);

      return info;
    } else {
      return info;
    }
  });
};

let logger = createLogger({
  format: combine(filterSecret(options)(), timestamp(), simple())
});

logger.add(
  new transports.Console({
    level: "silly"
  })
);

logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  }
};

module.exports = {
  logger,
  options
};
