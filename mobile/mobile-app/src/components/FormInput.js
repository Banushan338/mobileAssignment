import React from "react";
import { StyleSheet, TextInput } from "react-native";

export default function FormInput(props) {
  return <TextInput placeholderTextColor="#94a3b8" style={styles.input} {...props} />;
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#d9def4",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: "#f8faff",
    color: "#111827"
  }
});
