import axios from 'axios';

const _TIMEOUT = 15000 * 4

export default class ApiManager {

    _BASE_URL = "http://192.168.15.206:3000/";

    _LOGIN = "users/authenticate"
    _REGISTER = "users/register"


    async sendGetRequest(_url, _params) {
        _url = this._BASE_URL + _url;
        console.log("API _url", _url)

        try {
            let response = await axios.get(_url, {
                data: _params ? _params : null,
                timeout: _TIMEOUT
            });

            console.log("API call response", response)
            return response;

        } catch (error) {
            let err = [];
            err.error = error;
            err.no_result = true;
            console.log("catch error on ", _url, " call fail", err)
            setTimeout(() => {
                alert("Unable to connect with server")
            }, 400)
            return err;
        }
    }


    async sendPostRequest(_url, _params, headers) {
        _url = this._BASE_URL + _url;
        console.log("API _url", _url)

        if (!_params) {
            _params = {}
        }

        if (!headers) {
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        try {
            let response = await axios({
                method: 'post',
                url: _url,
                data: _params,
                headers: headers,
                timeout: _TIMEOUT
            });
            console.log("API call response", response)
            return response;

        } catch (error) {
            let err = [];
            err.error = error;
            err.no_result = true;
            console.log("catch error on ", _url, " call fail", err)
            setTimeout(() => {
                alert("Unable to connect with server")
            }, 400)
            return err;
        }
    }

    userLogin(_email, _password, _name, first_name, last_name, middle_name, _photo) {
        let url = this._LOGIN;

        let body = `email=${_email}&password=${_password}`

        if (_name && _photo) {
            body = `email=${_email}&password=dummypassword&first_name=${first_name}&last_name=${last_name}&middle_name=${middle_name || ""}&image_url=${_photo}&social_login=${true}`
        }

        return this.sendPostRequest(url, body)
    }



    userRegister(_email, _first_name, _password) {
        let url = this._REGISTER;


        let body = `email=${_email}&first_name=${_first_name}&password=${_password}`

        return this.sendPostRequest(url, body)
    }

}