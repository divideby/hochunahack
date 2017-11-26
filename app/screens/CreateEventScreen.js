import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  DatePickerIOS,
  Modal,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { H4, Input, Button, Spinner } from "nachos-ui";
import MapView from "react-native-maps";
import moment from "moment";

import { addEvent, createUser } from "../actions";

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
    modalVisible: false,
    date: new Date(),
    loading: false,
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
    const { coords, date } = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, padding: 20 }}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert("Modal has been closed.");
            }}
          >
            <TouchableWithoutFeedback
              onPress={() =>
                this.setState({
                  modalVisible: false,
                })}
              style={{ flex: 1 }}
            >
              <View style={{ flex: 1, justifyContent: "flex-end", padding: 10 }}>
                <View
                  style={{
                    shadowColor: "black",
                    shadowOpacity: 0.4,
                    shadowRadius: 2,
                    shadowOffset: {
                      width: 2,
                      height: 2,
                    },
                    backgroundColor: "white",
                  }}
                >
                  <DatePickerIOS
                    minimumDate={new Date()}
                    date={date}
                    onDateChange={newDate => this.setState({ date: newDate })}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <H4>Nullam tristique diam non turpis.</H4>
          <Input
            placeholder="Название мероприятия"
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
          />
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  modalVisible: true,
                })}
            >
              <Text>Дата: {moment(date).format("YYYY.MM.DD")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  modalVisible: true,
                })}
            >
              <Text>Время: {moment(date).format("HH:mm")}</Text>
            </TouchableOpacity>
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
          {this.state.loading ? (
            <View style={{ width: "100%" }}>
              <Spinner />
            </View>
          ) : (
            <Button
              kind="squared"
              type="success"
              style={{ marginTop: 10, width: "100%" }}
              onPress={() => {
                this.setState({ loading: true });
                addEvent(this.state.name, date.toString(), coords).then(() =>
                  this.setState({ loading: false })
                );
              }}
            >
              Создать мероприятие
            </Button>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default CreateEventScreen;
