const path = require('path');
const webpack = require('webpack');


//It moves every require("style.css") in entry chunks into a separate css output file. 
//So your styles are no longer inlined into the javascript, 
//but separate in a css bundle file (styles.css). 
//If your total stylesheet volume is big, 
//it will be faster because the stylesheet bundle is loaded in parallel to the javascript bundle.
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: ['./src/index','./src/scss/default.scss',],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',

    //"var" - Export by setting a variable: var Library = xxx (default)
    //"this" - Export by setting a property of this: this["Library"] = xxx
    //"commonjs" - Export by setting a property of exports: exports["Library"] = xxx
    //"commonjs2" - Export by setting module.exports: module.exports = xxx
    //"amd" - Export to AMD (optionally named - set the name via the library option)
    //"umd" - Export to AMD, CommonJS2 or as property in root
    //Default: "var"
    libraryTarget: "commonjs2"
  },
  externals: {
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        "NODE_ENV": JSON.stringify("production")
      }
    }),

    //Search for equal or similar files and deduplicate them in the output. 
    //This comes with some overhead for the entry chunk, but can reduce file size effectively.
    //Note: Don’t use it in watch mode. Only for production builds.
    new webpack.optimize.DedupePlugin(),

    //Minimize all JavaScript output of chunks. 
    //Loaders are switched into minimizing mode. 
    new webpack.optimize.UglifyJsPlugin(),

    //new ExtractTextPlugin([id: string], filename: string, [options])
    //filename => the filename of the result file
    //allChunks extract from all additional chunks too (by default it extracts only from the initial chunk(s))
    new ExtractTextPlugin("bundle.css", { allChunks: true })
  ],
  module: {
    loaders: [
    { test: /\.js$/, loader: 'babel-loader', include: [ path.join(__dirname, 'src/') ] },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url?limit=10000'
      },

      //ExtractTextPlugin.extract([notExtractLoader], loader, [options])
      //loader the loader(s) that should be used for converting the resource to a css exporting module.
      { test: /\.(s)*css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader") }
    ]
  }
};
