import { combineReducers } from 'redux';
import user from './user';
import wrapAuth from './wrapAuth';

const reducer = combineReducers({
    user,
    wrapAuth
});

export default reducer;