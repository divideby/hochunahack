import * as types from "../constants/actionTypes";
import initialState from "./initialState";

export default function(state = initialState.events, action) {
  switch (action.type) {
    case types.SUCCESS_RETRIEVE_EVENTS:
      return action.events;
    default:
      return state;
  }
}
