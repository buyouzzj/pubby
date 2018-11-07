/**
 * @name: 全局公共引用
 * @description: 全局公共引用
 * @author: qiaozhi.xqz
 */

// 引入核心依赖库
import Vue from 'vue';
import store from './vuex/store';

// 引入自定义指令
import directives from '@alipay/dui-vue-directives';

// 引入UI组件
// import { Row, Col, Button } from 'dui';

// 全局注册UI组件
// Vue.component('d-row', Row);
// Vue.component('d-col', Col);
// Vue.component('d-btn', Button);

// 引入全局css
require('src/assets/css/_import.scss');

// 引入全局util
import dateFormatter from './utils/date-format';

// 获取Vue框架
window.getVue = () => Vue;

// 注册
export default {
  init() {
    // 载入全局util
    dateFormatter();
  },
  vue(params, isRouter) { // 初始化一个vue组件
    const config = params;
    config.directives = directives; // 挂载自定义指令
    config.store = store; // 挂载store
    if (isRouter) {
      return config;
    }
    return new Vue(config);
  },
};
