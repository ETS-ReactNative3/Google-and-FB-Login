
import React, {
    Component
} from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';



import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'

import { connect } from 'react-redux';
import { setUserData } from './redux/actions/ActionsUserData'


import MyStorage from "./helpers/MyStorage";


import Loader from './components/common/loader'


const NotLoginStack = createStackNavigator({
    Login: Login,
    Signup: Signup
}, {
        navigationOptions: ({ navigation }) => {
            return {
                // gesturesEnabled: false,
            }
        },
        headerMode: "none",
        mode: 'modal',
    }
);
const LoginStack = createStackNavigator({
    Home: Home
}, {
        navigationOptions: ({ navigation }) => {
            return {
                // gesturesEnabled: false,
            }
        },
        headerMode: "none",
        mode: 'modal',
    }
);

class Router extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show_init_load: true
        }
    }

    componentDidMount() {
        this.checkLogin()
    }

    render() {


        if (this.state.show_init_load) {
            return <Loader />
        } else {
            if (this.props.user && this.props.user.jwt) {
                const AppContainer = createAppContainer(LoginStack);
                return (
                    <AppContainer />
                );
            } else {
                const AppContainer = createAppContainer(NotLoginStack);
                return (
                    <AppContainer />
                )
            }

        }
    }

    checkLogin = () => {

        new MyStorage().getUserInfo().then(user => {

            if (user) {
                new MyStorage().getUserJWT().then(jwt => {
                    if (jwt) {
                        user = JSON.parse(user);
                        const { login_type } = user;

                        this.props.setUserData(user, jwt, login_type);
                    }

                })
            }

            this.setState({
                show_init_load: false
            })

        }).catch(e => {
            console.log(e)
        })
    }

};


const mapStateToProps = (state) => {

    const { user_data } = state;

    return {
        user: user_data
    }
}

const actions = {
    setUserData
}


export default connect(mapStateToProps, actions)(Router);