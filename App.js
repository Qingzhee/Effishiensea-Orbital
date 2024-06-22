import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from "./app/(tabs)/LoginPage";
import CreateAccPage from "./app/(tabs)/CreateAccPage";
import HomePage from "./app/(tabs)/HomePage";
import ForgotPassword from "./app/(tabs)/ForgotPassword";
import Aquarium from "./app/(tabs)/Aquarium";
import Friends from "./app/(tabs)/FriendsPage";
import Settings from './app/(tabs)/SettingsPage';
import Gacha from './app/(tabs)/Gacha';
import FriendsAquarium from './app/(tabs)/FriendsAquarium';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const FriendsStack = createNativeStackNavigator();

function FriendsStackNavigator() {
  return (
    <FriendsStack.Navigator>
      <FriendsStack.Screen name="FriendsMain" component={Friends} options={{headerShown: false}}/>
      <FriendsStack.Screen name="FriendsAquarium" component={FriendsAquarium} options={{headerShown: false}}/>
    </FriendsStack.Navigator>
  );
}

function ScreensDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomePage} />
      <Drawer.Screen name="Aquarium" component={Aquarium}/>
      <Drawer.Screen name="Gacha" component={Gacha} />  
      <Drawer.Screen name="Friends" component={FriendsStackNavigator} options={{unmountOnBlur: true}}/>
      <Drawer.Screen name="Settings" component={Settings} />
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
