/**
 * @name: Main组件
 * @description: 主layout组件
 */

import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react/lib/CSSTransitionGroup';
import './style.scss';

import Header from '../header';
import Footer from '../footer';
import Sidebar from '../sidebar';

export default class extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div id="main">
        <Header />
        <Sidebar />
        <ReactCSSTransitionGroup
          component="div"
          transitionName="fade"
          transitionEnterTimeout={200}
          transitionLeave={false}
          transitionLeaveTimeout={200}
        >
          {React.cloneElement(this.props.children, {
            key: this.props.location.pathname,
            parentPointer: this,
          })}
        </ReactCSSTransitionGroup>
        <Footer />
      </div>
    );
  }
}
