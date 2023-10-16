import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/components/login";
import CreateUser from "./src/components/CreateUser";
import WelcomeScreen from './src/components/WelcomeScreen';
import CreateNote from "./src/components/CreateNote";
import Collections from "./src/components/Collections";
import Notes from "./src/components/Notes";
import EditNote from "./src/components/EditNote";


const Stack = createStackNavigator();

const App = () => {


  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Create User" component={CreateUser} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="CreateNote" component={CreateNote} />
        <Stack.Screen name="Collections" component={Collections} />
        <Stack.Screen name="Notes" component={Notes} />
        <Stack.Screen name="EditNote" component={EditNote} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;
