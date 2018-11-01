import style from './index.less';
import React, { Component } from 'react';

export default class Index extends Component{
  render() {
    return (
        <div className={style.container}>
          <h1>Hello React!</h1>
        </div>
    )
  }
}