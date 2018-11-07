/**
 * @name: [vuex]browser模块
 * @description: vuex初始化
 * @author: qiaozhi.xqz
 */

// 公共state
const state = {
  scrollTop: 0, // 滚屏高度
};

// 公共mutations
const mutations = {
  SCROLLTOP(states, scrollTop) { // 更新滚屏高度
    const newStates = states;
    newStates.scrollTop = scrollTop;
  },
};

export default {
  state,
  mutations,
};
