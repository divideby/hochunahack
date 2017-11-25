import React, { Component } from "react";
import { View } from "react-native";
import { H4 } from "nachos-ui";

class EventScreen extends Component {
  render() {
    const { event } = this.props.navigation.state.params;
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <H4>Hello</H4>
      </View>
    );
  }
}

export default EventScreen;
