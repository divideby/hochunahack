import React, { Component } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { H4, Spinner, Card } from "nachos-ui";
import { connect } from "react-redux";

import { getEvents } from "../actions";

class EventsScreen extends Component {
  state = {
    loading: true,
  };

  componentWillMount() {
    getEvents().then(() => this.setState({ loading: false }));
  }

  render() {
    const { loading } = this.state;
    const { events } = this.props;
    if (loading) {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Spinner />
        </View>
      );
    }
    return (
      <View style={{ padding: 10, backgroundColor: "white" }}>
        <FlatList
          data={events}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Event", { event: item })}
              style={{ marginBottom: 20 }}
            >
              <Card footerContent={item.title} image={"https://upx.cz/BsN"} />
            </TouchableOpacity>
          )}
        />
        <H4>Example:</H4>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.events || [],
  };
}

export default connect(mapStateToProps)(EventsScreen);
