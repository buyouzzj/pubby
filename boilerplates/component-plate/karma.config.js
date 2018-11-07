var webpackConfig = {
  devtool: 'inline-source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }],
    postLoaders: [{
      test: /\.js$/,
      exclude: /test\/|node_modules/,
      loaders: ['istanbul-instrumenter']
    }]
  },
  resolve: {
    alias: {}
  }
}

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    files: [
      './test/*.spec.js',
    ],
    preprocessors: {
      "./test/*.spec.js": ['webpack', 'sourcemap', 'coverage'],
    },
    plugins: [
      "karma-coverage",
      "karma-mocha",
      "karma-phantomjs-launcher",
      "karma-sinon-chai",
      "karma-sourcemap-loader",
      "karma-spec-reporter",
      "karma-webpack"
    ],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}
