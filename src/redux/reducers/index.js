import {
    combineReducers
} from 'redux'

import ReducerUserData from "./ReducerUserData";

export default combineReducers({
    user_data: ReducerUserData
})