import React, { Component } from 'react';
import { RootNavigator } from './navigation';
import { Provider } from 'react-redux';
import { configureStore } from './redux';

const store = configureStore()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}
