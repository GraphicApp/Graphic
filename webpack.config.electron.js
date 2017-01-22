import webpack from 'webpack';
import path from 'path';
import BabiliPlugin from 'babili-webpack-plugin';

export default {
  devtool: 'source-map',
  noInfo: true,
  entry: [
    'babel-polyfill',
    './src/main',
  ],
  output: {
    path: __dirname,
    filename: './src/main.js'
  },
  plugins: [
    new BabiliPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('product')
    })
  ],
  module: {
    loaders: [
      {test: /\.jsx?$/, include: path.join(__dirname, 'src'), loaders: ['babel-loader']},
      {test: /(\.scss)$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
      {test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  target: 'electron-main'
};
