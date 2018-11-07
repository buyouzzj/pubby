/**
 * @name: Index组件
 * @description: 单个视图组件
 */

import React, { Component } from 'react';
import { NoticeBar, Button, WingBlank, WhiteSpace, InputItem } from 'antd-mobile';
import { fetch } from '@alipay/cube-util';
import Header from '../../layouts/header';
import './style.scss';

export default class extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    fetch.get('https://os.alipayobjects.com/rmsportal/NxrGXhmPyNCvMve.json');
  }
  render() {
    return (
      <div>
        <Header />

        <NoticeBar type="success" mode="closable">国庆期间余额宝收益和转出到账时间</NoticeBar>

        <InputItem
          placeholder="输入"
        >标题</InputItem>

        <InputItem
          placeholder="0.00"
          extra="元"
        >价格</InputItem>

        <WhiteSpace size="lg" />

        <WingBlank>
          <Button className="btn" type="primary">primary 按钮</Button>
        </WingBlank>

      </div>
    );
  }
}
