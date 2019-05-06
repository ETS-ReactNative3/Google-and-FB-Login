import {
    USER_DATA
} from "../types";
import ApiManager from "../../helpers/ApiManager";

export const setUserData = (user, jwt_token, login_type) => {
    return {
        type: USER_DATA,
        payload: {
            user: user,
            jwt: jwt_token,
            login_type: login_type
        }

    }
}