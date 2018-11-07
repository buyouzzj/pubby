/**
 * @name: Todo组件
 * @description: 单个视图组件
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import './style.scss';

import TodoAdd from './components/todo-add';

class Todo extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="todo-wrap">
        <TodoAdd username={this.props.username} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.User.username,
  };
}

export default connect(mapStateToProps)(Todo);
