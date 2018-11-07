/**
 * @name: Header组件
 * @description: layout组件
 */

import React, { Component } from 'react';
import { NavBar, Icon, Tabs } from 'antd-mobile';
import './style.scss';

const TabPane = Tabs.TabPane;

export default class Header extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <header>
        <div className="navigation">
          <NavBar
            leftContent="返回"
            mode="light"
            onLeftClick={() => console.log('onLeftClick')}
            rightContent={[<Icon key="0" type="search" />, <Icon key="1" type="ellipsis" />]}
          >上数移动项目</NavBar>
          <Tabs defaultActiveKey="1">
            <TabPane tab="选项卡一" key="1">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '2rem' }}>
                选项卡一内容
              </div>
            </TabPane>
            <TabPane tab="选项卡二" key="2">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '2rem' }}>
                选项卡二内容
              </div>
            </TabPane>
            <TabPane tab="选项卡三" key="3">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '2rem' }}>
                选项卡三内容
              </div>
            </TabPane>
          </Tabs>
        </div>
      </header>
    );
  }
}
