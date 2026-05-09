import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppNavigator from "./src/navigation/AppNavigator";
import { THEME } from "./src/theme/theme";

export default function App() {
  const [auth, setAuth] = useState({ token: "", user: null });
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const restore = async () => {
      const token = await AsyncStorage.getItem("token");
      const userText = await AsyncStorage.getItem("user");

      if (token && userText) {
        setAuth({ token, user: JSON.parse(userText) });
      }

      setChecking(false);
    };

    restore();
  }, []);

  if (checking) {
    return <ActivityIndicator style={styles.loading} size="large" color={THEME.primary} />;
  }

  return <AppNavigator auth={auth} setAuth={setAuth} />;
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 48
  }
});
