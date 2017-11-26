import React, { Component } from "react";
import { View } from "react-native";
import { Button } from "nachos-ui";

import { signOut } from "../actions";

class ProfileScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button onPress={() => signOut()} kind="squared" type="danger">
          Выход
        </Button>
      </View>
    );
  }
}

export default ProfileScreen;
