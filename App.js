import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import Splash from "./components/Splash";
import Onboard from "./components/Onboard";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import store from "./components/Redux/store";
import Home from "./components/Home";
import TravelDetail from "./components/TravelDetails";
import { Image } from "react-native";
import { reloadUser } from "./components/controller/loginController";
import { login, logout } from "./components/Redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
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
