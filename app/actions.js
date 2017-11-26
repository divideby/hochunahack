import axios from "axios";
import * as firebase from "firebase";
import { AsyncStorage } from "react-native";

import * as actionTypes from "./constants/actionTypes";
const API_URL = "http://api.hochuna.com/";

const config = {
  apiKey: "AIzaSyBzGbcZe5-Q6KjmC3OBrgdOBXF3JNoTkxQ",
  authDomain: "test-904c1.firebaseapp.com",
  databaseURL: "https://test-904c1.firebaseio.com",
  storageBucket: "test-904c1.appspot.com",
};
firebase.initializeApp(config);
const database = firebase.database();

export async function getAuthInfo() {
  return {
    email: await AsyncStorage.getItem("@Auth:Username"),
    password: await AsyncStorage.getItem("@Auth:Password"),
  };
}

export function setAuthInfo(email, password) {
  return Promise.all([
    AsyncStorage.setItem("@Auth:Username", email),
    AsyncStorage.setItem("@Auth:Password", password),
  ]);
}

function apiRequest(urlSuffix, params = {}, successCallback, failCallback) {
  console.log("DTDBG: url request", API_URL + urlSuffix);
  return axios
    .get(API_URL + urlSuffix)
    .then(res => {
      return successCallback(res.data);
    })
    .catch(error => {
      return failCallback(error);
    });
}

export const addEvent = (name, date, coords) => {
  const event = {
    name,
    date,
    coords,
    createdTime: firebase.database.ServerValue.TIMESTAMP,
  };
  console.log("DTDBG: event", event);
  return database.ref(`/events`).push(event);
};

export const getEvents = () => {
  return database
    .ref(`/events`)
    .once("value")
    .then(snapshot => {
      const rawEvents = snapshot.val();
      let events = [];
      for (const ind in rawEvents) {
        events.push({ ...rawEvents[ind], id: ind });
      }
      events = events.sort((a, b) => b.createdTime - a.createdTime);
      global.store.dispatch({
        type: actionTypes.SUCCESS_RETRIEVE_EVENTS,
        events,
      });
    });
};

export const createUser = (email, password, callback) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(userData => {
      global.store.dispatch({
        type: actionTypes.SET_AUTH,
        isAuth: true,
      });
      callback(userData);
    })
    .catch(error => {
      callback(null, error);
    });
};

export const authUser = (email, password, callback) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(userData => {
      global.store.dispatch({
        type: actionTypes.SET_AUTH,
        isAuth: true,
      });
      callback(userData);
    })
    .catch(error => {
      callback(null, error);
    });
};

export const signOut = () => {
  AsyncStorage.clear();
  firebase
    .auth()
    .signOut()
    .then(function() {
      global.store.dispatch({
        type: actionTypes.SET_AUTH,
        isAuth: false,
      });
    })
    .catch(function(error) {
      // An error happened.
    });
};
