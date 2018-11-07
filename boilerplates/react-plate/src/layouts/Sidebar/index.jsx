/**
 * @name: Sidebar组件
 * @description: layout组件
 */

import React, { Component } from 'react';
import './style.scss';

export default class extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="container clearFix">
        <aside className="sidebar">侧边栏</aside>
      </div>
    );
  }
}
