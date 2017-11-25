import React, { Component } from "react";
import { Provider } from "react-redux";
import { AppRegistry, View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation'

import configureStore from "./store/configureStore";
import EventsScreen from "./screens/EventsScreen";


global.store = configureStore();

const AppNavigator = StackNavigator({
  Events: {
    screen: EventsScreen,
  }
});

class Hochuna extends Component {
  render() {
    return (
      <Provider store={global.store}>
        <AppNavigator />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('hochuna', () => Hochuna);
