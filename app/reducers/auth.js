import * as types from "../constants/actionTypes";
import initialState from "./initialState";

export default function(state = initialState.auth, action) {
  switch (action.type) {
    case types.SET_AUTH:
      return {
        ...state,
        isAuth: action.isAuth,
      };
    default:
      return state;
  }
}
