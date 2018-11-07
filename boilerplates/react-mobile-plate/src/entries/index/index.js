/**
 * @name: webpack编译入口
 * @description: 默认为index，多页可扩展多文件夹
 */
import { render } from 'react-dom';
import './style.scss';
import router from './router';

render(router, document.getElementById('app'));
