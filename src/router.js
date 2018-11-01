import React, { Component } from 'react';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Bundle from './public/components/bundle'
import stores from './redux/'

// 路由配置表
const routerConfig = [
  {
    path: '/',
    exact: true,
    component(props) {
      return <Bundle {...props} load={() => import('./pages/index/')} />;
    }
  },

  {
    path: '/test',
    component(props) {
      return <Bundle {...props} load={() => import('./pages/test/')} />;
    }
  }
];

/**
 * 路由生成
 * @param {Object} store  
 */
const Root = ({store}) => {
  const routerTags = routerConfig.map((item, index) => <Route key={index} exact={item.exact} path={item.path} component={item.component} />);

  return (
    <Provider store={store}>
      <Router>
        <div>
          {routerTags}
        </div>
      </Router>
    </Provider>
  )
}

export default Root(stores());