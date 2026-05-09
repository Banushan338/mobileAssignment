import React, { useState } from "react";
import { Alert, SafeAreaView, ScrollView, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiRequest } from "../api/api";
import AppButton from "../components/AppButton";
import FormInput from "../components/FormInput";
import { styles } from "../theme/screenStyles";

export default function RegisterScreen({ setAuth }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || password.length < 6) {
      return Alert.alert("Validation", "Valid name/email/password(6+) required.");
    }

    try {
      const data = await apiRequest("/auth/register", "POST", "", {
        name,
        email,
        password
      });
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      setAuth({ token: data.token, user: data.user });
    } catch (error) {
      Alert.alert("Register failed", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.screenContent} keyboardShouldPersistTaps="handled">
        <View style={[styles.heroCard, styles.heroCardRegister]}>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>Start managing rooms in a modern dashboard.</Text>
        </View>

        <View style={styles.card}>
          <FormInput placeholder="Full Name" value={name} onChangeText={setName} />
          <FormInput
            placeholder="Email"
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={setEmail}
          />
          <FormInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />
          <AppButton title="Register" variant="success" onPress={handleRegister} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
