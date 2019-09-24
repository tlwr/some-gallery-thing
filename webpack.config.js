const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');

const commonConfig = {
  mode: process.env.NODE_ENV,

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: [
          'css-loader',
        ],
      },
      {
        include: path.join(__dirname, 'src/css'),
        test: /\.scss$/,
        loader: [
          'css-to-string-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ],
  },

  resolve: {
    extensions: [
      '.tsx', '.ts',
      '.jsx', '.js',
      '.scss', '.css',
    ]
  },

  target: 'node',

  plugins: [],
};

const devConfig = {
  ...commonConfig,

  entry: './src/server.ts',

  output: {
    filename: 'dev.js',
    path: path.resolve(__dirname, 'dist')
  },
};

const compiledConfig = {
  ...commonConfig,

  entry: './src/server.ts',

  output: {
    filename: 'compiled.js',
    path: path.resolve(__dirname, 'dist')
  }
};

if (process.env.ENABLE_WATCH === 'true') {
  devConfig.watch = process.env.ENABLE_WATCH === 'true';

  devConfig.plugins.push(new NodemonPlugin({
    script: './dist/dev.js',
    watch: path.resolve('./dist'),
  }));
}


module.exports = [
  devConfig,
  compiledConfig,
];
