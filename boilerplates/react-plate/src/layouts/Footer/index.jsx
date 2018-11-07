/**
 * @name: Footer组件
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
      <footer>
        <div className="container clearFix">
          <span>蚂蚁金服 · 上数信息</span>
        </div>
      </footer>
    );
  }
}
