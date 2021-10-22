const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  devtool: false,
  devServer: {
    port: 3000
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash].bundle.js',
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    alias: {
      react: path.join(__dirname, 'node_modules', 'react'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
              sassOptions: {
                indentWidth: 4
              }
            }
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
    }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
    }),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
    // Calculates sizes of gziped bundles.
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith(".js.gz");
    },
  },
  optimization: {
    splitChunks: {
      minSize: 10000,
      maxSize: 512000,
    }
  }
};