import { StackNavigator } from "react-navigation";
import EventScreen from "./screens/EventScreen";
import EventsScreen from "./screens/EventsScreen";

const EventsNavigator = StackNavigator(
  {
    Events: {
      screen: EventsScreen,
    },
    Event: {
      screen: EventScreen,
    },
  },
  {
    initialRouteName: "Events",
    cardStyle: { backgroundColor: "white" },
  }
);

export default EventsNavigator;
