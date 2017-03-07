const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: './source/client.jsx',
  output: {
    filename: 'app.js',
    path: './built/static',
    publicPath: process.env.NODE_ENV === 'production'
      ? 'https://kras-react-sfs.now.sh'
      : 'http://localhost:3001/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['es2016', 'es2017', 'react'],
          plugins: ['transform-es2015-modules-commonjs'],
          env: {
            production: {
              plugins: ['transform-regenerator', 'transform-runtime'],
              presets: ['es2015'],
            },
            development: {
              plugins: ['transform-es2015-modules-commonjs'],
            },
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?modules' }),
      },
    ],
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    // ordenar los modulos dependiendo de los mas requeridos
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new ExtractTextPlugin({ filename: '../static/style.css' }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(), // evita que pasen dependencias duplicadas
    new webpack.optimize.UglifyJsPlugin({ // minificar el codigo
      compress: {
        warnings: false,
      },
      mangle: {
        except: ['$super', '$', 'required', 'exports'],
      },
    })
  );
}

module.exports = config;
