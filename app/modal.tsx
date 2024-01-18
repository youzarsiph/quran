import React from "react";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text, Surface } from "react-native-paper";

const Modal = () => (
  <Surface>
    <Text>Modal</Text>

    {/* Use a light status bar on iOS to account for the black space above the modal */}
    <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
  </Surface>
);

export default Modal;
