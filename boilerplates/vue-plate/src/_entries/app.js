/**
 * @name: 单页入口文件
 * @description: 单页入口文件
 * @author: qiaozhi.xqz
 */

 // 引入核心依赖
 import Vue from 'vue';
 import VueRouter from 'vue-router';
 import { sync } from 'vuex-router-sync';
 import global from '../global';
 import { configRouter } from '../router';
 import store from '../vuex/store';

 // 初始化全局钩子
 global.init();

 // 引用视图
 import app from '../views/app';

 // 注册路由
 Vue.use(VueRouter);

 // 创建路由
 const router = new VueRouter({
   transitionOnLoad: true,
 });
 // 初始化路由
 configRouter(router);

 // 同步vuex与vue-router
 sync(store, router);

 // 启动app
 router.start(global.vue({
   components: { app },
 }, true), '#app');
