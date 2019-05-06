import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';


import Loader from './common/loader'

import jwtDecode from 'jwt-decode'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import { Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import validator from 'validator'

import { connect } from 'react-redux'
import { setUserData } from '../redux/actions/ActionsUserData'

import { COLOR_ACCENT, COLOR_PRIMARY, COLOR_SECONDARY, CUSTOM_LOGIN } from '../helpers/constants';


import MyStorage from '../helpers/MyStorage';
import ApiManager from '../helpers/ApiManager'

const BG = require('../resources/images/bg.jpg')

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_progress_bar: false,
            email: "husnain@gmail.com",
            first_name: "Husnain",
            password: "12345678",

        };
    }

    createTopView = () => {
        return (
            <View
                style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: (12),
                }}
            >
                <View />
                <Text
                    style={{
                        color: COLOR_SECONDARY,
                        textAlign: "center",
                        fontWeight: "700",
                        fontSize: (20)
                    }}
                >
                    New account
                </Text>
                <Icon
                    name="close"
                    type="material-community"
                    size={32}
                    color={COLOR_SECONDARY}
                    onPress={() => {
                        this.props.navigation.goBack()
                    }}
                />
            </View>
        )
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
                        this.state.email,
                        "Email",
                        false,
                        "email-address",
                        this.handleEmail,
                        "at"
                    )
                }
                {
                    this.createInputField(
                        this.state.first_name,
                        "First Name",
                        false,
                        "phone-pad",
                        this.handleName,
                        "phone"
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
                    paddingHorizontal: (16),
                    paddingVertical: (4),
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



    handleEmail = (text) => {
        this.setState({
            email: text
        })
    }

    handleName = (text) => {
        this.setState({
            first_name: text
        })
    }

    handlePassword = (text) => {
        this.setState({
            password: text
        })
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
                <View style={{ flex: 1 }} >
                    <SafeAreaView
                        style={{
                            flex: 1,
                        }}
                    >
                        <KeyboardAwareScrollView>
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    paddingTop: (16)
                                }}
                            >
                                {this.createTopView()}

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

                                        this.startRegistration()
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: COLOR_SECONDARY,
                                            fontSize: (14),
                                            fontWeight: "700",
                                        }}
                                    >
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>



                            </View>

                        </KeyboardAwareScrollView>
                        <Loader loading={this.state.show_progress_bar} />
                    </SafeAreaView>


                </View>
            </ImageBackground>
        );
    }

    startRegistration = () => {
        const {
            email,
            first_name,
            password
        } = this.state;
        if (!validator.isEmail(email)) {
            alert("Email format is not correct")

            return
        }

        if (validator.isEmpty(password)) {
            alert("password cannot be empty")
            return;
        } else if (password.length < 4) {
            alert("password length must be more than 3")
            return;
        }

        this.setState({
            show_progress_bar: true
        })

        new ApiManager().userRegister(email, first_name, password).then(result => {
            this.setState({
                show_progress_bar: false
            }, () => {

                setTimeout(() => {
                    this.processRegisterResponse(result)
                }, 300)

            })
        })

    }

    processRegisterResponse = (result) => {

        if (result.no_result) {
            return;
        }

        const { data } = result;

        if (data.error) {
            alert(data.error)
            return
        }
        if (data.response) {
            this.updateStoreAndAsyncStorage(data);
        }

    }

    updateStoreAndAsyncStorage(data) {


        const { jwt } = data.response
        var decoded = jwtDecode(jwt);
        decoded.login_type = CUSTOM_LOGIN;

        new MyStorage().setUserInfo(JSON.stringify(decoded));
        new MyStorage().setUserJWT(jwt);
        this.props.setUserData(decoded, jwt, CUSTOM_LOGIN);
    }
}


const mapStateToProps = (state) => {

    return {
        user: state.user_data
    }
}

const actions = {
    setUserData
}


export default connect(mapStateToProps, actions)(SignUp);