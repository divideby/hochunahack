import React, { Component } from "react";
import { View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Text } from "react-native";
import { Input, Button, Spinner, H4 } from "nachos-ui";

import { createUser, authUser, getAuthInfo, setAuthInfo } from "../actions";

class LoginScreen extends Component {
  state = {
    email: "",
    password: "",
    error: null,
    isAuth: true,
    authorizing: false,
  };

  componentWillMount() {
    getAuthInfo().then(({ email, password }) => {
      if (email) {
        this.authUser(email, password);
      }
    });
  }

  authUser(email, password) {
    this.setState({ authorizing: true });
    authUser(email, password, (data, error) => {
      if (!error) {
        setAuthInfo(email, password);
      }
      this.setState({ error, authorizing: false });
    });
  }

  createUser(email, password) {
    this.setState({ authorizing: true });
    createUser(email, password, (data, error) => {
      if (!error) {
        setAuthInfo(email, password);
      }
      this.setState({ error, authorizing: false });
    });
  }

  render() {
    const { isAuth } = this.state;
    if (this.state.authorizing) {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Spinner />
        </View>
      );
    }
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 10, alignItems: "center", justifyContent: "center" }}>
          <Input
            placeholder="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <Input
            placeholder="Пароль"
            value={this.state.password}
            secureTextEntry
            onChangeText={password => this.setState({ password })}
          />
          {this.state.error && <H4>{this.state.error.message}</H4>}
          <TouchableOpacity
            style={{
              marginTop: 10,
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              backgroundColor: "lightblue",
            }}
            onPress={() => {
              if (isAuth) {
                this.authUser(this.state.email, this.state.password);
              } else {
                this.createUser(this.state.email, this.state.password);
              }
            }}
          >
            <Text>{!isAuth ? "Зарегистрироваться" : "Войти"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => this.setState({ isAuth: !isAuth })}
          >
            <Text>{isAuth ? "Зарегистрироваться" : "Войти"}</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default LoginScreen;
