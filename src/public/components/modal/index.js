import {Component} from "react";
import {createPortal} from "react-dom";

import Modal from './modal';


export default class Dialog extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return createPortal(
            <ModalPortal
                {...this.props}
            />,
            this.node
        );
    }
}