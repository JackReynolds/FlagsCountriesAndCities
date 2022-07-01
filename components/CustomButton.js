import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";

const CustomButton = ({ text }) => {
  return (
    <View style={styles.button}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressedItem}
        onPress={() => console.log("pressed")}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderColor: "lightgreen",
    borderRadius: 10,
    borderWidth: 2,
    width: "80%",
    alignItems: "center",
    marginVertical: 15,
    backgroundColor: "#5e0acc",
  },
  buttonText: {
    fontSize: 16,
    padding: 8,
    color: "white",
  },
  pressedItem: {
    opacity: 0.5,
  },
});

export default CustomButton;
