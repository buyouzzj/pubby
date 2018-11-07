/**
 * @name: vuex全局存储
 * @description: vuex初始化文件
 * @author: qiaozhi.xqz
 */

import Vue from 'vue';
import Vuex from 'vuex';

// 引入模块的action与mutation
import browser from './modules/browser';
import user from './modules/user';
import todo from './modules/todo';

Vue.use(Vuex);

// store根state
const state = {
};
// store根mutations
const mutations = {
};

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    browser,
    user,
    todo,
  },
  strict: process.env.NODE_ENV !== 'production',
});
