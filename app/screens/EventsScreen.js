import React, { Component } from "react";
import { View } from "react-native";
import { H4 } from "nachos-ui";

import { getEvents } from "../actions";

class EventsScreen extends Component {
  componentWillMount() {
    getEvents();
  }

  render() {
    return (
      <View>
        <H4>Example:</H4>
      </View>
    );
  }
}

export default EventsScreen;
