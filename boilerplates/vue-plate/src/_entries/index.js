/**
 * @name: 首页入口文件
 * @description: 首页入口文件
 * @author: qiaozhi.xqz
 */

 // 引入核心依赖
 import global from '../global';

 // 初始化全局钩子
 global.init();

 // 引用视图
 import Index from '../views/index';

 // 初始化入口
 global.vue({
   el: 'body',
   components: { Index },
 });
