/**
 * @name: Todo组件
 * @description: 单个视图组件
 */

import React, { Component } from 'react';
import './style.scss';

export default class TodoAdd extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const username = this.props.username;

    return (
      <div>
        <div className="todo-title">
          <span>用户名：{ username }</span>
        </div>
      </div>
    );
  }
}
