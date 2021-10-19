const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');

const commonConfig = {
  module: {
    rules: [
      {
        include: path.join(__dirname, 'src/css'),
        test: /\.scss$/,
        use: [
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
    ],
  },

  plugins: [],
};

const devConfig = {
  ...commonConfig,

  mode: process.env.NODE_ENV === 'compile' ? 'production' : process.env.NODE_ENV,

  entry: './src/server.ts',

  output: {
    filename: 'dev.js',
    path: path.resolve(__dirname, 'dist')
  },

  target: 'node',
};

if (process.env.ENABLE_WATCH === 'true') {
  devConfig.watch = process.env.ENABLE_WATCH === 'true';

  devConfig.plugins.push(new NodemonPlugin({
    script: './dist/dev.js',
    watch: path.resolve('./dist'),
  }));
}

if (process.env.NODE_ENV === 'compile') {
  const compiledConfig = {
    ...commonConfig,

    mode: 'production',

    entry: './src/worker/entrypoint.ts',

    output: {
      filename: 'compiled.js',
      path: path.resolve(__dirname, 'dist')
    },

    target: 'web',

    resolve: {
      ...commonConfig.resolve,
      alias: {
        'assert': 'assert',
        'buffer': 'buffer',
        'crypto': 'crypto-browserify',
        'http': 'stream-http',
        'https': 'https-browserify',
        'stream': 'stream-browserify',
        'url': 'url',
        'zlib': 'browserify-zlib',
      },
    }
  };

  module.exports = [
    devConfig,
    compiledConfig,
  ];
} else {
  module.exports = [
    devConfig,
  ];
}
