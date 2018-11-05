import style from './index.less';
import React, { Component } from 'react';
import Dialog from '../../public/components/modal/';

export default class Index extends Component{
  handle(){

  }
  render() {
    return (
        <div className={style.container}>
          <h1 onClick={this.handle}>Hello React!</h1>
          <Dialog>
            <div>I am a modal</div>
            <form>
              <input />
              <button>tab navigation</button>
              <button>stays</button>
              <button>inside</button>
              <button>the modal</button>
            </form>
          </Dialog>
        </div>
    )
  }
}