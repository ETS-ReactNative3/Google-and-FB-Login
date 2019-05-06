import {
    USER_DATA
} from '../types'

const INITIAL_STATE = {
    user: undefined,
    login_type: null,
    jwt: null,
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case USER_DATA: {
            return {
                ...state,
                user: action.payload.user,
                login_type: action.payload.login_type,
                jwt: action.payload.jwt
            }
        }

        default: {
            return {
                ...state
            }
        }

    }
}