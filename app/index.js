import React, { Component } from "react";
import { Provider } from "react-redux";
import { AppRegistry, View, Text } from "react-native";
import { StackNavigator } from "react-navigation";

import configureStore from "./store/configureStore";
import EventsScreen from "./screens/EventsScreen";
import EventScreen from "./screens/EventScreen";
import MapScreen from "./screens/MapScreen";
import CreateEventScreen from "./screens/CreateEventScreen";

global.store = configureStore();

const AppNavigator = StackNavigator(
  {
    Events: {
      screen: EventsScreen,
    },
    Event: {
      screen: EventScreen,
    },
    CreateEvent: {
      screen: CreateEventScreen,
    },
    Map: {
      screen: MapScreen,
    },
  },
  {
    initialRouteName: "CreateEvent",
    cardStyle: { backgroundColor: "white" },
  }
);

class Hochuna extends Component {
  render() {
    return (
      <Provider store={global.store}>
        <AppNavigator />
      </Provider>
    );
  }
}

AppRegistry.registerComponent("hochuna", () => Hochuna);
