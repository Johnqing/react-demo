import React, { Component } from 'react';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';

import Index from './pages/index/'
import Test from './pages/test/'

function routers(){
  return (
    <Router>
      <div>
        <Route key="/" exact path="/" component={Index} />
        <Route key="/a" exact path="/a" component={Test} />
      </div>
    </Router>
  )
}


export default routers()