/**
 * @name: 全局公共getters
 * @description: 多组件共享getters，被多个组件共享的getter可被高效缓存，状态更改仅需计算一次。
 * @author: qiaozhi.xqz
 */

// 获取滚动高度
export const scrollTop = state => state.browser.scrollTop;
