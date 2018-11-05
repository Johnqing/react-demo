import {Component} from "react";
import {createPortal} from "react-dom";
import PropTypes from "prop-types";

import Modal from './modal'
import style from './index.less';

export default class Dialog extends Component{
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        isShowHead: PropTypes.bool.isRequired,
    }
    constructor(props){
        super(props);
    }
    render(){
        return createPortal(
            <div className={style.overlay}>
                <Modal
                    {...this.props}
                />
            </div>
            ,
            document.getElementsByTagName('body')[0]
        );
    }
}