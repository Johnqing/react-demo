import {Component} from "react";

import style from './modal';

export default class Modal extends Component {
    constructor(props){
        super(props);

    }
    buildClassName(){
        return arguments[0]
    }
    render() {
        const {overlayClassName} = this.props;
        return (
            <div className={this.buildClassName('overlay', overlayClassName)}>
                {this.props.children}
            </div>
        )
    }
}