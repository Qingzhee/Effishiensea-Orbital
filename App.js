import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/(tabs)/LoginPage.tsx";
import CreateAccPage from "./app/(tabs)/CreateAccPage.tsx";
import HomePage from "./app/(tabs)/HomePage.tsx";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }} />
        <Stack.Screen name="CreateAcc" component={CreateAccPage} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
