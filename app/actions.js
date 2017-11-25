import axios from "axios";

import * as actionTypes from "./constants/actionTypes";
const API_URL = "http://api.hochuna.com/";

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

export const getEvents = () => {
  return apiRequest(
    "open-events",
    {},
    events => {
      console.log("DTDBG: events ", events);
      global.store.dispatch({
        type: actionTypes.SUCCESS_RETRIEVE_EVENTS,
        events,
      });
    },
    error => {
      console.log("DTDBG: error ", error);
    }
  );
};
