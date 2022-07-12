import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLOURS, SIZES } from "../assets/constants";
import { useNavigation } from "@react-navigation/native";

const NavButton = (props) => {
  const navigation = useNavigation();
  //console.log(props.numberOfQuestions, props.continent);
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <TouchableOpacity
        style={{
          marginTop: 30,
          width: "100%",
          backgroundColor: COLOURS.accent,
          padding: 20,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: COLOURS.white,
        }}
        onPress={() =>
          navigation.navigate(props.navigateToScreen, {
            numberOfQuestions: props.numberOfQuestions,
            continent: props.continent,
          })
        }
      >
        <Text
          style={{
            fontSize: 21,
            color: COLOURS.white,
            textAlign: "center",
            fontFamily: "Helvetica",
            fontWeight: "bold",
          }}
        >
          {props.buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavButton;
