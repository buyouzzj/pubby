/**
 * @name: 应用路由配置
 * @description: 路由配置，转到React
 */

import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';

// 视图列表
import Main from '../../layouts/main';  // 主视图
import Index from '../../components/index';
import Todo from '../../components/todo';

function welcome(nextState, replace, callback) {
  console.log('welcome!');
  callback();
}

export default ({ history }) => (
  <Router history={history}>
    <Route path="/" component={Main} onEnter={welcome}>
      <IndexRoute component={Index} />
      <Route path="todo" component={Todo} />
    </Route>
  </Router>
);
