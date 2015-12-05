# kana.js
[![Build Status](https://travis-ci.org/murmur76/kana.svg?branch=master)](https://travis-ci.org/murmur76/kana)

## Why
`kana.js` helps you to build a clean, elegant RESTful API without effort.
<br/>
It encourages developers to use ES2015 [Promise] / [Generator] style easily which is really nice to manage asynchronous control flow with robust error handling. 
It's intended to be used on top of [Express.js] which is mainstream framework for building a node.js application, that means you can use bunch of libraries and middlewares freely.

Let me show you a very simple example code using kana.js.

```js
'use strict';

const User = require('../models/User');
const NotFound = require('kana/lib/exception').NotFound;

module.exports = {
  show: function* (params) {
    let user = yield User.findById(params.userId);
    if (!user) throw new NotFound('User Not Found');
    return { result: user.toJSON() };
  }
};
```

<br/>
See? It's incredibly simple to build a RESTful API without any callback hell nor error handling code.
<br/>
`kana.js` abstracts all these for you so that you can focus on writing real code.
<br/>
The equivalent code of standard [Express.js] style is like below.
<br/>


```js
module.exports = {
  show: function (req, res) {
    User.findById(req.params.userId, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.send();
      }
      if (!user) {
        res.statusCode = 404;
        res.send({ message: 'User Not Found' });
      }
      res.send({ result: user.toJSON() });
    });
  },
};
```
So much things to take care of!!

<br/>

## Get Started
<br/>
You can install `kana.js` with simple command.
```bash
$ npm install kana
```
<br/>

### 1. Define routes
You can define routes on config file which is almost same to [Sails.js].
```js
// config/routes.js

module.exports = {
  'get /user': 'UserController.index',
  'get /user/:userId': 'UserController.show',
  'post /user': 'UserController.create',
  'delete /user': 'UserController.remove'
};
```
Quite straightforward.
<br/>
<br/>

### 2. Bind routes
On your `main.js` script,
```js
'use strict';

const app = require('express')();
const Router = require('kana').Router;

app.use(require('body-parser').json())
Router.bindRoute(app);

let server = app.listen(3000, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
```
By calling `Router.bindRoute` method, you can bind all routes defined in config file.

<br/>
<br/>

### 3. Define Default Error Handler
Just same as [Express.js], you can define a default error handling middleware at last.
```js
'use strict';

const app = require('express')();
const Router = require('kana').Router;
const Exception = require('kana/lib/exception').Exception;

app.use(require('body-parser').json())
Router.bindRoute(app);

app.use((err, req, res, next) => {
  if (!err) return next();
  if (err instanceof Exception) {
    res.statusCode = err.status;
    res.send(err);
  } else {
    console.log(err.stack);
    res.statusCode = 500;
    res.send();
  }
});
```
<br/>
<br/>

### 4. Write Controller
You must locate controller file under `app/controllers/` directory. For instance,
```js
// app/controllers/UserController.js

'use strict';

const NotFound = require('kana/lib/exception').NotFound;
const User = require('../models/User');

module.exports = {
  index: function* () {
    let users = yield User.find();
    return { result: users.map(_ => _.toJSON()) };
  },

  show: function* (params) {
    let user = yield User.findById(params.userId);
    if (!user) throw new NotFound('User Not Found');
    return { result: user.toJSON() };
  },

  create: function* (params) {
    let user = yield User.create(params);
    return { result: user.toJSON() };
  }
};
```
Each action is a generator function which takes `params` argument and returns [Promise].
<br/>
You can find all neccessary data from `params` argument which has request body, route parameters, query strings.
<br/>
If you need raw access to [Express.js] request / response object, you can find it in `this` context like `this.req`, `this.res`.
<br/>
For ORM, `kana.js` doesn't restrict you to choose specific ORM framework.
<br/>
You can choose whatever you want as long as it supports [Promise] interface.
<br/>
<br/>

### 5. Throw Exception
`kana.js` supports basic exceptions like `BadRequest`, `NotFound`, `Forbidden`, `InternalError`.
<br/>
They all inherits parent class `Exception`.
<br/>
So you can basically define any custom exception class like below.
```js
const Exception = require('kana/lib/exception').Exception;

class CustomException extends Exception {
  constructor(msg) {
    super(msg);
    this.status = 777;
  }
}

module.exports = CustomException;
```
<br/>
<br/>

And that's it. Enjoy your programming!

[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise 
[Generator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator
[Express.js]: http://expressjs.com 
[Sails.js]: http://sailsjs.org 

