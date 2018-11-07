/**
 * @name: Header组件
 * @description: layout组件
 */

import { dateFormatter } from '@alipay/cube-util';
import React, { Component } from 'react';
import { connect } from 'dva';
import './style.scss';

class Header extends Component {
  constructor() {
    super();
    this.state = {};
  }
  changeTime() {
    this.props.dispatch({
      type: 'User/changeTime',
      timeStr: dateFormatter(new Date(), 'hh:mm:ss'),
    });
  }
  render() {
    const pathname = this.props.pathname;
    const routeTime = this.props.routeTime;

    return (
      <header>
        <div className="navigation">
          <a href="#/" className={pathname === '/' ? 'selected' : ''} onClick={this.changeTime.bind(this)}>首页</a>
          <a href="#/todo" className={pathname === '/todo' ? 'selected' : ''} onClick={this.changeTime.bind(this)}>Todo</a>
          <a>上次切换时间：{routeTime}</a>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    pathname: state.routing.locationBeforeTransitions.pathname,
    routeTime: state.User.routeTime,
  };
}

export default connect(mapStateToProps)(Header);
