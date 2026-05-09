import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RoomListScreen from "../screens/RoomListScreen";
import ComplaintsScreen from "../screens/ComplaintsScreen";
import { THEME } from "../theme/theme";

const Stack = createNativeStackNavigator();

export default function AppNavigator({ auth, setAuth }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: THEME.primary },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "700" },
          contentStyle: { backgroundColor: THEME.background }
        }}
      >
        {!auth.token ? (
          <>
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} setAuth={setAuth} />}
            </Stack.Screen>
            <Stack.Screen name="Register">
              {(props) => <RegisterScreen {...props} setAuth={setAuth} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Rooms">
              {(props) => <RoomListScreen {...props} auth={auth} setAuth={setAuth} />}
            </Stack.Screen>
            <Stack.Screen name="Complaints" options={{ title: "Room Complaints" }}>
              {(props) => <ComplaintsScreen {...props} auth={auth} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
