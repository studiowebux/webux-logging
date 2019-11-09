# Webux Logging
This module allows to log everything that go through the req and res.
It means that the req/res object from express are redirected using morgan and printed on the console or using a custom logger.

## Installation 
```bash
npm i --save @studiowebux/logging
```

## Usage
### types:
Possible types,   
to use logstash, you have to use json.  
- combined
- tiny
- dev
- common
- short
- json

### format
you can add what you need here, but keep in mind, if you need more morgan token, please create a pull request to add new one.  
```
{
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
  ```


### Full example
```
const webuxLogging = require("../index");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const options = {
  type: "json",
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

app.use(
  bodyParser.json({
    limit: "10MB"
  })
);

app.use("*", (req, res) => {
  res.send("BONJOUR !");
});

app.listen(1337);
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
SEE LICENSE IN license.txt