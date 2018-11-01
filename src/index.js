import React from 'react';
import {render} from 'react-dom';

// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
// import '/base/reset.scss';
import router from './router';

const CONTAINER = document.getElementById('root');

if (!CONTAINER) {
    throw new Error('当前页面不存在 <div id="root"></div> 节点.');
}

render(router, CONTAINER);