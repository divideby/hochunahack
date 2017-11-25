import React, { Component } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";

class MapScreen extends Component {
  render() {
    const latlng = {
      latitude: 37.78825,
      longitude: -122.4324,
    };
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MapView.Marker coordinate={latlng}>
            <View style={{ width: 20, height: 20, backgroundColor: "red" }} />
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}

export default MapScreen;
