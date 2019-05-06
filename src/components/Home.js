import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, Image } from 'react-native';

import { SocialIcon } from 'react-native-elements';

import { connect } from 'react-redux';
import { setUserData } from '../redux/actions/ActionsUserData'

import {
    FB_LOGIN,
    GOOGLE_LOGIN,
    CUSTOM_LOGIN,
    COLOR_PRIMARY,
    COLOR_SECONDARY,
    COLOR_ACCENT
} from '../helpers/constants'
import MyStorage from '../helpers/MyStorage';



import { GoogleSignin, statusCodes } from 'react-native-google-signin';

const FBSDK = require('react-native-fbsdk');

const {
    LoginManager,
    AccessToken
} = FBSDK;


const BG = require('../resources/images/bg_home.jpg')

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    facebookButton = () => {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    this.logout()
                }}
            >

                <SocialIcon
                    title='Logout'
                    button
                    type='facebook'
                    style={{
                        marginHorizontal: 32
                    }}
                />


            </TouchableOpacity>
        )
    }

    googleButton = () => {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    this.logout()
                }}
            >

                <SocialIcon
                    title='Logout'
                    button
                    type='google-plus-official'
                    style={{
                        marginHorizontal: 32
                    }}
                />


            </TouchableOpacity>
        )
    }

    render() {

        const login_type = this.getLoginType()

        const { first_name, image_url } = this.props.user.user

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
                        <Text
                            style={{
                                color: COLOR_SECONDARY,
                                alignSelf: "center",
                                fontWeight: "700",
                                fontSize: (20)
                            }}
                        >
                            Welcome {first_name}
                        </Text>

                        <Image
                            source={{ uri: image_url }}
                            style={{
                                marginTop: 32,
                                height: 120,
                                width: 120,
                                borderRadius: 60,
                                alignSelf: "center",
                                borderColor: "#fff",
                                backgroundColor: COLOR_PRIMARY,
                                borderWidth: 1
                            }}
                        // resizeMode="center"
                        />

                        <View
                            style={{
                                flex: 1,
                                paddingBottom: 32,
                                justifyContent: "flex-end"
                            }}
                        >
                            {
                                login_type == 1
                                &&
                                this.facebookButton()
                            }
                            {
                                login_type == 2
                                &&
                                this.googleButton()
                            }

                        </View>
                    </SafeAreaView>
                    {
                        login_type == 3
                        &&
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

                                this.logout()

                            }}
                        >
                            <Text style={{
                                color: COLOR_ACCENT,
                                alignSelf: "center",
                                fontWeight: "800",
                                fontSize: (20)
                            }}

                            >
                                Logout
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
            </ImageBackground>
        );
    }


    getLoginType = () => {

        const { login_type } = this.props.user;

        if (login_type == FB_LOGIN) {
            return 1
        } else if (login_type == GOOGLE_LOGIN) {
            return 2
        } else if (login_type == CUSTOM_LOGIN) {
            return 3
        }
    }

    logout = () => {

        const login_type = this.getLoginType()
        if (login_type == 1) {

            AccessToken.getCurrentAccessToken().then((data) => {
                if (data.accessToken.toString().length > 10) {
                    LoginManager.logOut();
                }
            })

        } else if (login_type == 2) {

            GoogleSignin.isSignedIn().then(data => {
                if (data) {
                    GoogleSignin.signOut()
                }
            })

        }

        new MyStorage().clearStorage()
        this.props.setUserData(null, null, null)
    }
}

const mapStateToProps = (state) => {
    const { user_data } = state;
    console.log(user_data)
    return {
        state,
        user: user_data
    }
}

const actions = {
    setUserData
}

export default connect(mapStateToProps, actions)(HomeScreen);
