/**
 * @name: webpack编译入口
 * @description: 默认为index，多页可扩展多文件夹
 */

import dva from 'dva';
import './style.scss';
import router from './router';
import models from '../../models';

const app = dva();
Object.keys(models).forEach((key) => {
  app.model(models[key]);
});
app.router(router);
app.start('#app');
