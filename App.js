import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "./components/Redux/store";
import Main from "./components/Main";

const Stack = createStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
