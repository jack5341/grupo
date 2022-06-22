<center>
<img width="50%" src="https://user-images.githubusercontent.com/53150440/175107210-450ba9f7-661b-488a-aeeb-4f469aecf307.png"></img>
</center>

# Grupo!

[![NPM Version][npm-version-image]][npm-url]

Run your application as cluster mode in middleware! 🃏

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install grupo
```

## API

<!-- eslint-disable no-unused-vars -->

```js
import grupo from "grupo";
```

### grupo(options)

Grupo has options as parameter and has own logger in it. You can enable and disable it as you wish by using options. Run your application in cluster mode and choose how many thread you need.

#### Options

Grupo accepts these properties in the options object.

```ts
interface options {
  instance?: number;
  log?: boolean;
}
```

### instance

Instance is counter for how many thread you wan't to use, of course is limit how much you have.

```js
// Will use 3 thread
// The default value is 0, so will use all cores
app.use(
  grupo({
    instance: 3,
  })
);
```

### log

Log is an boolean that turn off and on logs about your cluster.

```js
// Will print logs about cluster
// The default value is true
app.use(
  grupo({
    log: false,
  })
);
```

## Examples

### express/connect

```js
var express = require("express");
var grupo = require("grupo");

var app = express();

app.use(grupo());

app.get("/", function (req, res) {
  res.send("hello, world!");
});
```

### vanilla http server

```js
var finalhandler = require("finalhandler");
var http = require("http");
var grupo = require("grupo");

// create "middleware"
var logger = grupo();

http.createServer(function (req, res) {
  var done = finalhandler(req, res);
  logger(req, res, function (err) {
    if (err) return done(err);

    // respond to request
    res.setHeader("content-type", "text/plain");
    res.end("hello, world!");
  });
});
```

## License

[MIT](LICENSE)

[npm-url]: https://npmjs.org/package/grupo
[npm-version-image]: https://badgen.net/npm/v/grupo
