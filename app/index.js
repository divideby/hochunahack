import React, { Component } from "react";
import { Provider } from "react-redux";
import { AppRegistry, View, Text } from "react-native";
import { TabNavigator } from "react-navigation";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import "moment/locale/ru";
import { connect } from "react-redux";

import configureStore from "./store/configureStore";
import MapScreen from "./screens/MapScreen";
import CreateEventScreen from "./screens/CreateEventScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";

import EventNavigator from "./EventNavigator";

global.store = configureStore();
console.disableYellowBox = true;

const AppNavigator = TabNavigator(
  {
    Events: {
      screen: EventNavigator,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => <MaterialIcons size={22} name="event" color={tintColor} />,
      }),
    },
    CreateEvent: {
      screen: CreateEventScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome size={20} name="calendar-plus-o" color={tintColor} />
        ),
      }),
    },
    Map: {
      screen: MapScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => <Entypo size={20} name="map" color={tintColor} />,
      }),
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => <Entypo size={20} name="map" color={tintColor} />,
      }),
    },
  },
  {
    tabBarPosition: "bottom",
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: "#e91e63",
    },
  }
);

const App = connect(({ auth }) => auth)(({ isAuth }) => (
  <View style={{ flex: 1 }}>{isAuth ? <AppNavigator /> : <LoginScreen />}</View>
));

class Hochuna extends Component {
  render() {
    return (
      <Provider store={global.store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent("hochuna", () => Hochuna);
