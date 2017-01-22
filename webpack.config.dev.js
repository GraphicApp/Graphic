import webpack from 'webpack';
import path from 'path';

const port = process.env.PORT || 3000;

export default {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false,
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'src'),
    publicPath: `http://localhost:${port}/dist/`,
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
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
  target: 'electron-renderer'
};
