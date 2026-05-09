import Constants from "expo-constants";
import { Platform } from "react-native";

const resolveApiBase = () => {
  if (process.env.EXPO_PUBLIC_API_BASE_URL) {
    return process.env.EXPO_PUBLIC_API_BASE_URL;
  }

  const hostFromExpo = Constants?.expoConfig?.hostUri?.split(":")?.[0];
  const hostFromDebugger = Constants?.manifest?.debuggerHost?.split(":")?.[0];
  const host = hostFromExpo || hostFromDebugger;

  if (host) {
    return `http://${host}:5000/api`;
  }

  if (Platform.OS === "android") {
    return "http://10.0.2.2:5000/api";
  }

  return "http://localhost:5000/api";
};

const API_BASE = resolveApiBase();

export async function apiRequest(path, method = "GET", token = "", body = null) {
  let res;
  try {
    const headers = {
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };

    const options = {
      method,
      headers,
      ...(body ? { body: body instanceof FormData ? body : JSON.stringify(body) } : {})
    };

    // Don't set Content-Type for FormData, let fetch set it automatically
    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    console.log("Making request to:", `${API_BASE}${path}`, "with method:", method);
    if (body instanceof FormData) {
      console.log("Sending FormData");
    }

    console.log("Making request to:", `${API_BASE}${path}`, "with method:", method);
    if (body instanceof FormData) {
      console.log("Sending FormData");
    }

    res = await fetch(`${API_BASE}${path}`, options);
  } catch (_error) {
    throw new Error(`Cannot reach server at ${API_BASE}. Check backend, IP, and emulator/device network.`);
  }

  const contentType = res.headers.get("content-type") || "";
  let data = {};

  if (contentType.includes("application/json")) {
    data = await res.json();
  } else {
    const text = await res.text();
    data = { message: text.slice(0, 120) || "Non-JSON response from server" };
  }

  if (!res.ok) throw new Error(data.message || `Request failed (${res.status})`);
  return data;
}
