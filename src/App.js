import React, { Component } from 'react';
import { View } from 'react-native';

import reducers from './redux/reducers'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk';


import Router from './Router';

export default class App extends Component {


  render() {

    console.disableYellowBox = true;
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

    return (
      <Provider store={store} >
        <Router />
      </Provider>
    );
  }
}

