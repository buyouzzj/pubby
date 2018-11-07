/**
 * @name: 全局公共actions
 * @description: 多组件共享的actions。
 * @author: qiaozhi.xqz
 */

// 修改用户名
export const changeUsername = ({ dispatch, state }, username) => {
  dispatch('CHANGE_USERNAME', username);
};

// 修改用户名
export const changeScrollTop = ({ dispatch, state }, scrollTop) => {
  dispatch('SCROLLTOP', scrollTop);
};
