var tmpdir = require('os').tmpdir;

// 默认配置
var babelConfig = {
  cacheDirectory: tmpdir(),
  presets: [
    require.resolve('babel-preset-react'),
    require.resolve('babel-preset-es2015'),
    require.resolve('babel-preset-stage-2'),
  ],
  plugins: [
    require.resolve('babel-plugin-add-module-exports'),
    require.resolve('babel-plugin-transform-decorators-legacy'),
    require.resolve('babel-plugin-transform-runtime'),
    [require.resolve('babel-plugin-import'), [
      { libraryName: "antd", style: "css" },
      { libraryName: "antd-mobile", style: "css" }
    ]]
  ],
  // env: {
  //   "development": {
  //     "presets": [require.resolve('babel-preset-react-hmre')]
  //   }
  // },
  // "env": {
  //   "development": {
  //     "plugins": ["react-hot-loader/babel"],
  //   },
  // },
  comments: false
};

// 配置babel
const isDev = process.argv[1].match('dev-server');
const customConfig = require('../../utils/custom-config')(isDev ? 'DEV' : 'PROD');
if (typeof customConfig.babel === 'function') {
  babelConfig = customConfig.babel(babelConfig);
} else if (typeof customConfig.babel === 'object') {
  Object.keys(customConfig.babel).forEach((key) => {
    babelConfig[key] = customConfig.babel[key];
  });
}
if (babelConfig.env && babelConfig.env.disableAntdCssModules) {
  babelConfig.plugins.pop();
  babelConfig.plugins.push([require.resolve('babel-plugin-import'), [
    { libraryName: "antd", style: false },
    { libraryName: "antd-mobile", style: false }
  ]]);
}

module.exports = babelConfig;
