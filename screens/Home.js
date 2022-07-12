import {
  View,
  Text,
  Button,
  SafeAreaView,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import NavButton from "../components/NavButton";
import { COLOURS, SIZES } from "../assets/constants";

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOURS.background }}>
      <View style={styles.mainContainer}>
        <View style={{ marginTop: 15, flex: 1 }}>
          <Text
            style={{
              fontSize: 32,
              textAlign: "center",
              color: COLOURS.white,
              fontWeight: "300",
              fontFamily: "Helvetica",
              letterSpacing: 1,
            }}
          >
            Welcome to Worldie
          </Text>
        </View>
        {/* <View style={{ marginTop: 20, flex: 1 }}></View> */}
        <View style={{ flex: 6 }}>
          <Text
            style={{
              fontSize: 22,
              textAlign: "center",
              color: COLOURS.white,
              fontWeight: "bold",
              letterSpacing: 1,
            }}
          >
            Choose Your Game Below
          </Text>

          <View
            style={{
              borderBottomColor: "white",
              borderBottomWidth: 1,
              marginTop: 25,
              width: "100%",
            }}
          />

          <NavButton
            navigateToScreen="ConfigGuessCountryFromFlag"
            buttonText="Guess Country from Flag"
          />
          <NavButton
            navigateToScreen="GuessCapitalFromCountry"
            buttonText="Guess Capital of Country"
          />
          <NavButton
            navigateToScreen="GuessCountryFromCapital"
            buttonText="Guess Country from Capital"
          />
          <NavButton
            navigateToScreen="GuessCountryFromLandmark"
            buttonText="Guess Country from Monument"
          />
          <NavButton
            navigateToScreen="GuessCountryFromFact"
            buttonText="Guess Country from Fact"
          />
        </View>

        <Image
          source={require("../assets/dottedBackground.png")}
          style={{
            width: SIZES.width,
            height: 160,
            zIndex: -1,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0.6,
          }}
          resizeMode={"contain"}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    fontFamily: "Helvetica Neue",
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 16,
    backgroundColor: COLOURS.background,
    position: "relative",
  },
  questionCounter: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 15,
  },
});

export default Home;
