
const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();


//==============================================

//1. Now add the middleware into your server:
const webpack = require('webpack');
const config = require('./webpack.dev.config');
const compiler = webpack(config);

//2 .Add webpack-dev-middleware the usual way
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

//3. Add webpack-hot-middleware attached to the same compiler instance
app.use(require('webpack-hot-middleware')(compiler));

//================================================



//1. what is __dirname
//The name of the directory that the currently executing script resides in.
//Example: running node example.js from /Users/mjr
//console.log(__dirname); The result is "/Users/mjr"

//2. what is path.join
//var filePath = path.join('foo', 'bar)';
// 'foo/bar' on OSX and Linux
// 'foo\\bar' on Windows
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'examples/index.html'));
});

//The app starts a server and listens on port 3000 for connections. 
app.listen(port, '0.0.0.0', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:' + port);
});
