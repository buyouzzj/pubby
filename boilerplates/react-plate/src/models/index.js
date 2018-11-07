/**
 * @name: models入口
 * @description: Use require.context to require models automatically
 * @author: qiaozhi.xqz
 */
const context = require.context('./', false, /\.js$/);
const keys = context.keys().filter(item => item !== './index.js');

const reducers = keys.reduce((memo, key) => {
  const newMemo = memo;
  if (key !== './Item-hn.js') {
    newMemo[key.match(/([^/]+)\.js$/)[1]] = context(key);
  }
  return newMemo;
}, {});

export default reducers;
