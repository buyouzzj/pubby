var projectRoot = process.cwd();
var pkg = require(projectRoot + '/package.json');
var webpack = require('webpack');

module.exports = {
  externals: pkg.cube.build_version === '1.1.0' ? {
    'react': 'window.React',
    'react-dom': 'window.ReactDOM',
    'react/lib/CSSTransitionGroup': 'window.React.addons.CSSTransitionGroup',
    'react/lib/LinkedStateMixin': 'window.React.addons.LinkedStateMixin',
    'react/lib/PureRenderMixin': 'window.React.addons.PureRenderMixin',
    'react/lib/TransitionGroup': 'window.React.addons.TransitionGroup',
    'react/lib/createFragment': 'window.React.addons.createFragment',
    'react/lib/shallowCompare': 'window.React.addons.shallowCompare',
    'react/lib/update': 'window.React.addons.update'
  } : {},
  manifestChunk: pkg.cube.build_version === '1.1.0' ? [] : [
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
  ],
}
