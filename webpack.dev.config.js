const path = require('path');
const webpack = require('webpack');

// if you use path.normalize('../../src/../src/node')
// The result is '../../src/node'
// path.normalize is "What is the shortest path I can take that will take me to the same place as the input",

// if you use path.resolve('../../src/../src/node')
// The result is '/Users/btilley/src/node'
// path.resolve is "What is my destination if I take this path."

const include = [ path.resolve(__dirname, 'src/'), path.resolve(__dirname, 'examples/') ];

module.exports = {
  devtool: 'source-maps',//A SourceMap is emitted. production supported YES.quality:original source
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE

    // Add 'webpack-hot-middleware/client' into the entry array.
    // This connects to the server to receive notifications when the bundle rebuilds and then updates your client bundle accordingly.
    'webpack-hot-middleware/client',

    './examples/example'    
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',

    //The publicPath specifies the public URL address of the output files when referenced in a browser. 
    //For loaders that embed <script> or <link> tags or reference assets like images, publicPath is used as the href or url() to the file when it's different than their location on disk (as specified by path). 
    //This can be helpful when you want to host some or all output files on a different domain or on a CDN. 
    //The Webpack Dev Server also uses this to determine the path where the output files are expected to be served from. 
    //As with path you can use the [hash] substitution for a better caching profile.
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      //Turn ES6 code into vanilla ES5 using Babe
      { test: /\.jsx?$/, loader: 'babel', include },
      //url: The url loader works like the file loader, but can return a Data Url if the file is smaller than a limit.
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url?limit=10000'
      },
      //style: Add exports of a module as style to DOM
      //css: Loads css file with resolved imports and returns css code
      //sass: Loads and compiles a scss file
      { test: /\.(s)*css$/, loader: "style!css!sass" }
    ]
  }
};
