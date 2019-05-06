import AsyncStorage from '@react-native-community/async-storage';


export default class MyStorage {

    user_info = "@user_info";
    user_jwt = "@user_jwt"


    setItem(key, value) {
        AsyncStorage.setItem(key, "".concat(value));
    }

    getItem(key) {
        return AsyncStorage.getItem(key);
    }

    removeItem(key) {
        return AsyncStorage.removeItem(key);
    }

    clearStorage() {
        return AsyncStorage.clear();
    }




    setUserJWT(jwt) {
        this.setItem(this.user_jwt, jwt)
    }

    getUserJWT() {
        return this.getItem(this.user_jwt);
    }

    rmUserJWT() {
        return this.removeItem(this.user_jwt);
    }

    setUserInfo(info) {
        this.setItem(this.user_info, info)
    }

    getUserInfo() {
        return this.getItem(this.user_info);
    }

    rmUserInfo() {
        return this.removeItem(this.user_info);
    }


}