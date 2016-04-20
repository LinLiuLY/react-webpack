 
Run `npm i`

# Excercises

## Webpack configuration for dev

- Add example.js in the entry 
```javascript
  entry: [
    ...
    './examples/example'
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
```
run `npm start` and check console output

- Add babel loader
```javascript
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', include }
    ]
```

run `npm start` and check console output

- import 'src/sass/default.scss' in `example.js`
```javascript
// inside example.js
import '../.src/scss/default.scss';

```
And check the output in your terminal

 - Add loaders for scss
```javascript
{ test: /\.(s)*css$/, loader: "style!css!sass" }
```

## Webpack configuration for production
- Run `npm run build` and check the console output
- Add output config
```javascript
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  }
```
run `npm run build` and check console output

- Add js entries and babel loader
```javascript
  entry: [
    './src/index'
  ],

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', include: [ path.join(__dirname, 'src/') ] },
    ]
  }
```
run `npm run build` and check console output

- Change the output target to be `commonjs2`
```javascript
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: "commonjs2"
  }
```

and check if you can require the module in node.js environment

- Add scss into entry
```javascript
  // require ExtractTextPlugin
  const ExtractTextPlugin = require("extract-text-webpack-plugin");

  // Add default.scss into the entry
  entry: [
    './src/scss/default.scss',
    ...
  ],

  loaders: [
    // Add css loaders
    { test: /\.(s)*css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader") }
  ]
```
run `npm run build` and check the files generated inside `dist` folder .

- Uglify your javascripts

```
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],
```
now run `npm run build` and check the content of `dist/bundle.js`
