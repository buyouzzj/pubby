/**
 * @name: [vuex]todo模块
 * @description: vuex初始化
 * @author: qiaozhi.xqz
 */

// 公共state
const state = {
  todoList: [
    {
      id: 1,
      content: '欢迎使用Vue Todo示例！',
      isDone: false,
    },
    {
      id: 2,
      content: '在上方文本框输入任意内容进行测试。',
      isDone: false,
    },
  ],
};

let totalId = 2;

// 公共mutations
const mutations = {
  ADD_TODO(states, value) {
    const newStates = states;
    newStates.todoList.push({
      id: ++totalId,
      content: value,
      isDone: false,
    });
  },
  CHECK_TODO(states, id) {
    const newStates = states;
    newStates.todoList.forEach((el) => {
      const newEl = el;
      if (newEl.id === id) {
        if (newEl.isDone) {
          newEl.isDone = false;
        } else {
          newEl.isDone = true;
        }
      }
    });
  },
  DEL_TODO(states, id) {
    const newStates = states;
    const newArr = newStates.todoList.filter(el => el.id !== id);
    newStates.todoList = newArr;
  },
};

export default {
  state,
  mutations,
};
