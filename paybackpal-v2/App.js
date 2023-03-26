import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import Scanner from "./screens/Scanner";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Scanner" component={Scanner} />
    </Stack.Navigator>
  );
}

function App() {
  return <>
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  </>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    top: -300,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2B369D",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
  },
  addButton: {
    position: "absolute",
    zIndex: 11,
    right: 20,
    bottom: 50,
    backgroundColor: "#2B369D",
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  popup: {
    position: "absolute",
    zIndex: 12,
    top: "30%",
    left: 50,
    backgroundColor: "#fff",
    height: 300,
    width: 300,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  popupHide: {
    display: "none",
  },
  inputName: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  addNameButton: {
    width: 100,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2B369D",
  },
  list: {
    position: "absolute",
    zIndex: 10,
    top: "20%",
    left: "5%",
    backgroundColor: "#fff",
    height: "50%",
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  listItem: {
    height: 40,
    width: "90%",
    margin: 3,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 6,
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  itemDebt: {
    color: "green",
  },
  deleteButton: {
    width: 100,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2B369D",
  },
});

export default App;