import React, { Component } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";
import { connect } from "react-redux";

class MapScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            longitude: 52.29778,
            latitude: 104.29639,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          {this.props.events.map((event, index) => (
            <MapView.Marker
              coordinate={{
                longitude: event.coords.longitude,
                latitude: event.coords.latitude,
              }}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.events,
  };
}

export default connect(mapStateToProps)(MapScreen);
