import React, { Component } from "react";
import { View } from "react-native";
import { H4, Input, Button } from "nachos-ui";
import MapView from "react-native-maps";

const INIT_REGION = {
  longitude: 52.29778,
  latitude: 104.29639,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

class CreateEventScreen extends Component {
  state = {
    name: "",
    coords: INIT_REGION,
  };

  componentWillMount() {
    global.navigator.geolocation.getCurrentPosition(position => {
      const coords = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
      this.setState({
        coords,
      });
    });
  }

  onRegionChange(coords) {
    this.setState({ coords });
  }

  render() {
    const { coords } = this.state;
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <H4>Nullam tristique diam non turpis.</H4>
        <Input
          placeholder="Название мероприятия"
          value={this.state.value}
          onChangeText={value => this.setState({ value })}
        />
        <View style={{ marginTop: 20, flexDirection: "row" }}>
          <Input
            style={{ flex: 1, marginRight: 5 }}
            placeholder="Дата"
            value={this.state.value}
            onChangeText={value => this.setState({ value })}
          />
          <Input
            style={{ flex: 1, marginLeft: 5 }}
            placeholder="Время"
            value={this.state.value}
            onChangeText={value => this.setState({ value })}
          />
        </View>
        <H4>
          Укажите место: {coords.longitude.toFixed(3)}, {coords.latitude.toFixed(3)}
        </H4>
        <MapView
          style={{ flex: 3 }}
          initialRegion={coords}
          onRegionChange={region => this.onRegionChange(region)}
        >
          <MapView.Marker
            coordinate={{
              longitude: coords.longitude,
              latitude: coords.latitude,
            }}
          />
        </MapView>
        <Button kind="squared" type="success" style={{ marginTop: 10, width: "100%" }}>
          Success
        </Button>
      </View>
    );
  }
}

export default CreateEventScreen;
