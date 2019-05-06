import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';


import jwtDecode from 'jwt-decode'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Icon, SocialIcon } from 'react-native-elements';
import { connect } from 'react-redux';
import { setUserData } from '../redux/actions/ActionsUserData'

import Loader from '../components/common/loader'

import MyStorage from '../helpers/MyStorage'
import ApiManager from '../helpers/ApiManager'


import {
    FB_LOGIN,
    GOOGLE_LOGIN,
    CUSTOM_LOGIN,
    COLOR_PRIMARY,
    COLOR_SECONDARY,
    COLOR_ACCENT
} from '../helpers/constants'
import config from '../helpers/config'

import { GoogleSignin, statusCodes } from 'react-native-google-signin';

const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
} = FBSDK;


const BG = require('../resources/images/bg.jpg')


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: "husnain@gmail.com",
            password: "12345678",

            show_progress_bar: false
        };

    }

    createInputs = () => {
        return (
            <View
                style={{
                    width: "100%",
                    marginTop: (30),
                }}
            >
                {
                    this.createInputField(
                        this.state.user_name,
                        "Username",
                        false,
                        "email-address",
                        this.handleUserName,
                        "user"
                    )
                }
                {
                    this.createInputField(
                        this.state.password,
                        "Password",
                        true,
                        "default",
                        this.handlePassword,
                        "lock"
                    )
                }
            </View>
        );
    }

    createInputField = (value, placeholder, is_secure, keyboard_type, textHandler, icon_name) => {
        return (
            <View
                style={{
                    paddingHorizontal: (8),
                    paddingVertical: (8),
                    flexDirection: "row",
                    alignItems: "flex-end"
                }}
            >
                <Icon
                    name={icon_name}
                    type="font-awesome"
                    size={26}
                    color={COLOR_PRIMARY}
                    containerStyle={{
                        width: 30,
                        height: 30,
                        borderRadius: 6,
                        backgroundColor: COLOR_SECONDARY,
                    }}
                />

                <Sae
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    value={value}
                    secureTextEntry={is_secure}
                    keyboardType={keyboard_type}
                    label={placeholder}
                    iconClass={FontAwesomeIcon}
                    iconName={'pencil'}
                    iconColor={COLOR_SECONDARY}

                    onChangeText={(text) => {
                        textHandler(text)
                    }}
                    inputStyle={{
                        fontSize: (22),
                        color: COLOR_SECONDARY
                    }}
                    labelStyle={{
                        color: COLOR_SECONDARY
                    }}
                    style={{
                        flex: 1,
                        marginHorizontal: (16)
                    }}
                />
            </View>
        )
    }

    handleUserName = (text) => {
        this.setState({
            user_name: text
        })
    }

    handlePassword = (text) => {
        this.setState({
            password: text
        })
    }


    createSocialIcons = () => {
        return (
            <View
                style={{
                    // backgroundColor: "#fff000",
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "center"
                }}
            >
                <SocialIcon
                    style={{
                        marginHorizontal: (18)
                    }}
                    light
                    type='facebook'
                    iconSize={32}
                    onPress={() => {
                        this.initFBLogin()
                    }}
                />

                <SocialIcon
                    style={{
                        marginHorizontal: (18)
                    }}
                    light
                    type='google-plus-official'
                    iconSize={32}
                    onPress={() => {
                        this.initGoogleLogin()
                    }}
                />
            </View>
        );
    }

    render() {
        return (
            <ImageBackground
                source={BG}
                style={{
                    flex: 1,
                    width: null,
                    height: null,
                }}
            >
                <View
                    style={{
                        flex: 1
                    }}
                >

                    <SafeAreaView
                        style={{
                            flex: 1,
                        }}
                    >
                        <KeyboardAwareScrollView>
                            <View
                                style={{
                                    flex: 1,
                                    paddingHorizontal: (8),
                                    paddingVertical: (8),
                                    alignItems: "center"
                                }}
                            >

                                {this.createInputs()}
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={{
                                        paddingVertical: (8),
                                        paddingHorizontal: (32),
                                        backgroundColor: COLOR_PRIMARY,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: 24
                                    }}
                                    onPress={() => {

                                        const { user_name, password } = this.state;
                                        if (user_name.trim().length < 1) {
                                            alert("Please enter username");
                                            return;
                                        }
                                        if (password.length < 1) {
                                            alert("Please enter password")
                                        }
                                        this.setState({
                                            show_progress_bar: true
                                        }, () => {
                                            this.authWithServer(user_name, password, null, null, null, null, null, CUSTOM_LOGIN)
                                        })
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: COLOR_SECONDARY,
                                            fontSize: (14),
                                            fontWeight: "700",
                                        }}
                                    >
                                        Login
                                    </Text>
                                </TouchableOpacity>

                            </View>

                        </KeyboardAwareScrollView>

                        <View
                            style={{
                                flex: 1,
                                paddingHorizontal: (8),
                                paddingVertical: (8),
                                alignItems: "center"
                            }}
                        >


                            <Text
                                style={{
                                    color: COLOR_SECONDARY,
                                    alignSelf: "center",
                                    fontSize: (13),
                                    marginTop: (64),
                                    paddingVertical: (8)
                                }}
                            >
                                or login with
                            </Text>

                            {this.createSocialIcons()}
                        </View>

                    </SafeAreaView>

                    <Loader loading={this.state.show_progress_bar} />

                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                            height: (70),
                            width: "100%",
                            backgroundColor: COLOR_PRIMARY,
                            justifyContent: "center",
                            alignItems: "center",
                            paddingBottom: (16)
                        }}
                        onPress={() => {

                            this.openSignUp()

                        }}
                    >
                        <Text style={{
                            color: COLOR_ACCENT,
                            alignSelf: "center",
                            fontWeight: "800",
                            fontSize: (20)
                        }}

                        >
                            Create new account
                        </Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        );
    }

    openSignUp = () => {
        this.props.navigation.navigate("Signup")
    }

    initFBLogin = () => {

        const THAT = this;

        LoginManager.logInWithReadPermissions(["public_profile", "email"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log('Login cancelled');
                } else {

                    AccessToken.getCurrentAccessToken().then((data) => {
                        console.log(data.accessToken.toString())
                    })

                    THAT.setState({
                        show_progress_bar: true
                    }, () => {

                        let req = new GraphRequest('/me', {
                            httpMethod: 'GET',
                            version: 'v2.5',
                            parameters: {
                                'fields': {
                                    'string': 'email,name,picture,first_name,last_name,middle_name'
                                }
                            }
                        }, (err, res) => {

                            console.log(err, res);
                            if (err) {

                                THAT.setState({
                                    show_progress_bar: false
                                })

                            } else if (res) {
                                const { name, email, picture, first_name, last_name, middle_name } = res;
                                const { url } = picture.data
                                THAT.authWithServer(email, "", name, first_name, last_name, middle_name, url, FB_LOGIN)
                            }

                        });

                        // // Start the graph request.
                        new GraphRequestManager().addRequest(req).start();

                    })

                }
            },
            function (error) {
                console.log('Login fail with error: ', error);
            }
        );
    }

    initGoogleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.configure({
                webClientId: config.googleLoginWebClientId,
                offlineAccess: false,
            });
            const userInfo = await GoogleSignin.signIn();

            const { name, email, photo, givenName, familyName } = userInfo.user;

            this.setState({
                show_progress_bar: true
            })
            this.authWithServer(email, "", name, givenName, familyName, "", photo, GOOGLE_LOGIN)

            // this.setState({ userInfo });
        } catch (error) {
            console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    authWithServer = (email, password, name, first_name, last_name, middle_name, photo, login_type) => {

        new ApiManager().userLogin(email, password, name, first_name, last_name, middle_name, photo).then(result => {

            this.setState({
                show_progress_bar: false
            }, () => {
                setTimeout(() => {
                    this.processResponse(result, login_type);
                }, 300)
            })

        })
    }

    processResponse = (result, login_type) => {

        if (result.no_result) {
            return;
        }

        const { data } = result;
        console.log(data);
        if (data.error) {
            alert(data.error)
            return
        }
        if (data.response) {

            const { jwt } = data.response
            var decoded = jwtDecode(jwt);
            decoded.login_type = login_type;

            new MyStorage().setUserInfo(JSON.stringify(decoded));
            new MyStorage().setUserJWT(jwt);
            this.props.setUserData(decoded, jwt, login_type);

        }

    }

}

const mapStateToProps = (state) => {
    const { user_data } = state;
    console.log(user_data)
    return {
        state
    }
}

const actions = {
    setUserData
}

export default connect(mapStateToProps, actions)(Login);
