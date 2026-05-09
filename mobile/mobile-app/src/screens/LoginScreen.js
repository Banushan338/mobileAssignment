import React, { useState } from "react";
import { Alert, SafeAreaView, ScrollView, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiRequest } from "../api/api";
import AppButton from "../components/AppButton";
import FormInput from "../components/FormInput";
import { THEME } from "../theme/theme";
import { styles } from "../theme/screenStyles";

export default function LoginScreen({ navigation, setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert("Validation", "Fill all fields.");

    try {
      const data = await apiRequest("/auth/login", "POST", "", { email, password });
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      setAuth({ token: data.token, user: data.user });
    } catch (error) {
      Alert.alert("Login failed", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.screenContent} keyboardShouldPersistTaps="handled">
        <View style={[styles.heroCard, styles.heroCardLogin]}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Manage your hostel rooms with ease.</Text>
        </View>

        <View style={styles.card}>
          <FormInput
            placeholder="Email"
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={setEmail}
          />
          <FormInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />
          <AppButton title="Login" variant="info" onPress={handleLogin} />
          <View style={styles.spacer} />
          <AppButton title="Create account" variant="secondary" onPress={() => navigation.navigate("Register")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
