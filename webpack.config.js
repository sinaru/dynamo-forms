const path = require('path');
const env = require('yargs').argv.env;
const mode = env === 'build' ? 'production' : 'development';
const filename = `dynamo-forms${env === 'build' ? '.min' : ''}.js`;

module.exports = {
  mode: mode,
  devtool: 'inline-source-map',
  entry: [
    './src/index.js'
  ],
  output: {
    library: 'dynamo-forms',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: filename,
    path: path.resolve(__dirname, 'dist'),
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components|dist)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js'],
    alias: { sinon: 'sinon/pkg/sinon.js' }
  }
};
