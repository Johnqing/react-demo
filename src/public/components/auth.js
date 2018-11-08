import React, {Component} from 'react';
import { connect } from 'react-redux';

function wrapAuth(ComposedComponent, key){
    class WrapComponent extends Component{
        constructor(props){
            super(props);
        }
        checkAuthKey(){

        }
        render(){
            return !this.checkAuthKey() ? null : (
                <ComposedComponent {...this.props} />
            )
        }
    }

    const mapStateToProps = state => ({
        key: state.authKeys[key]
    });

    return connect(mapStateToProps)(WrapComponent);
}

export default wrapAuth