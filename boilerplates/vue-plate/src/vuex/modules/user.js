/**
 * @name: [vuex]user模块
 * @description: vuex初始化
 * @author: qiaozhi.xqz
 */

import localStore from 'store';

// 公共state
const state = {
  username: window.loginUsername || localStore.get('loginUsername') || 'user', // 登录用户名
};

// 公共mutations
const mutations = {
  CHANGE_USERNAME(states, username) { // 更新用户名称
    const newStates = states;
    newStates.username = username;
  },
};

export default {
  state,
  mutations,
};
