import {Component} from "react";
import style from "./modal.less";
import PropTypes from "prop-types";
/**
 * 弹框
 */
export default class Modal extends Component {
    static defaultProps = {}
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        isShowHead: PropTypes.bool.isRequired,
        isShowFoot: PropTypes.bool.isRequired,
        closeTimeoutMS: PropTypes.number,
        modalClassName: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ])
    }
    constructor(props){
        super(props);
        // 初始化默认值
        this.state = {
            isOpen: false,
            isShowHead: true,
            isShowFoot: true,
            closeTimeoutMS: 0
        }
    }
    componentDidMount(){
        if(this.props.isOpen){
            this.open();
        }
    }
    // 确认是否
    shouldBeClosed = () => !this.state.isOpen;
    open(){
        this.setState({isOpen: true});
    }
    // 可以是定时关闭
    close(){
        if(this.props.closeTimeoutMS > 0){
            this.closeWithTimeout();
        } else {
            this.closeWithOutTimeout();
        }
    }

    closeWithOutTimeout(){
        this.setState({
            isOpen: false
        })
    }
    // 延迟关闭
    closeWithTimeout(){
        const now = + new Date();
        const time = now + this.props.closeTimeoutMS;
        setTimeout(() => {
            this.closeWithOutTimeout();
        }, time)
    }

    render() {
        return this.shouldBeClosed() ? null : (
            <div className={style.modal}>
                {this.isShowHead &&  <div className="head"></div>}
                <div className="body">
                    {this.props.children}
                </div>
                {this.isShowFoot && <div className="foot"></div>}
            </div>
        )
    }
}