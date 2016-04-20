
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


app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'examples/index.html'));
});

app.listen(port, '0.0.0.0', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:' + port);
});
