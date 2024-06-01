import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from "./app/(tabs)/LoginPage.tsx";
import CreateAccPage from "./app/(tabs)/CreateAccPage.tsx";
import HomePage from "./app/(tabs)/HomePage.tsx";
import ForgotPassword from "./app/(tabs)/ForgotPassword.tsx";
import Aquarium from "./app/(tabs)/Aquarium.tsx";
import Friends from "./app/(tabs)/FriendsPage.tsx";
import Gacha from "./app/(tabs)/GachaPage.tsx";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

//Add pages in here, the whole drawer navigator is a stack screen in the app navigator.
function ScreensDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomePage} />
      <Drawer.Screen name="Aquarium" component={Aquarium}/>
      <Drawer.Screen name="Gacha" component={Gacha} />
      <Drawer.Screen name="Friends" component={Friends} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }} />
        <Stack.Screen name="CreateAcc" component={CreateAccPage} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen name="Screens" component={ScreensDrawer} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}