import React, { Component } from "react";
import { View, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import { H4, Spinner, Card } from "nachos-ui";
import { connect } from "react-redux";
import { getEvents } from "../actions";

class EventsScreen extends Component {
  state = {
    loading: true,
    refreshing: false,
  };

  componentWillMount() {
    getEvents().then(() => this.setState({ loading: false }));
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    getEvents().then(() => {
      this.setState({ refreshing: false });
    });
  }

  render() {
    const { loading } = this.state;
    const { events } = this.props;
    console.log("DTDBG: events", events);
    if (loading) {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Spinner />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, padding: 10, backgroundColor: "white" }}>
        <FlatList
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          data={events}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Event", { event: item })}
              style={{ marginBottom: 20 }}
            >
              <Card footerContent={item.name} image={"https://upx.cz/BsN"} />
            </TouchableOpacity>
          )}
        />
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
