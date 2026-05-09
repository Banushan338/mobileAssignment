import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { THEME } from "../theme/theme";

export default function AppButton({ title, onPress, variant = "primary", fullWidth = true, disabled = false }) {
  const isSecondary = variant === "secondary";
  const isDanger = variant === "danger";
  const isInfo = variant === "info";
  const isSuccess = variant === "success";

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        fullWidth && styles.buttonFullWidth,
        isSecondary && styles.buttonSecondary,
        isDanger && styles.buttonDanger,
        isInfo && styles.buttonInfo,
        isSuccess && styles.buttonSuccess,
        pressed && !disabled && styles.buttonPressed,
        disabled && styles.buttonDisabled
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, isSecondary && styles.buttonSecondaryText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: THEME.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    alignItems: "center",
    marginVertical: 6
  },
  buttonFullWidth: {
    width: "100%"
  },
  buttonSecondary: {
    backgroundColor: "#eef2ff",
    borderWidth: 1,
    borderColor: "#c7d2fe"
  },
  buttonDanger: {
    backgroundColor: THEME.danger,
    marginTop: 10
  },
  buttonInfo: {
    backgroundColor: THEME.info
  },
  buttonSuccess: {
    backgroundColor: THEME.success
  },
  buttonPressed: {
    opacity: 0.88
  },
  buttonDisabled: {
    opacity: 0.5
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15
  },
  buttonSecondaryText: {
    color: THEME.primaryDark
  }
});
