/**
 * @name: todo-demo入口文件
 * @description: todo-demo入口文件
 * @author: qiaozhi.xqz
 */

// 引入核心依赖
import global from '../global';

// 初始化全局钩子
global.init();

// 引用视图
import Todo from '../views/todo';

// 初始化入口
global.vue({
  el: 'body',
  components: { Todo },
});
