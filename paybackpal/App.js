import { StyleSheet, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import FriendState from "./context/FriendState";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerStyle: { backgroundColor: '#d3d6f2'}, headerShadowVisible: false}} />
    </Stack.Navigator>
  );
}

function App() {
  return <>
    <FriendState>
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
    </FriendState>
  </>;
}

export default App;