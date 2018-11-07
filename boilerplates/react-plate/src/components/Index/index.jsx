/**
 * @name: Index组件
 * @description: 单个视图组件
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
      <div className="hello-world">
        <div className="container">
          hello, world!!!
        </div>
      </div>
    );
  }
}
