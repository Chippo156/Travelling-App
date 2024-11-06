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

const Stack = createStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboard"
            component={Onboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="TravelDetail" component={TravelDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
