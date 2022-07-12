import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { COLOURS, SIZES } from "../assets/constants";
import DropDownPicker from "react-native-dropdown-picker";
import NavButton from "../components/NavButton";
import GuessCountryFromFlag from "./GuessCountryFromFlag";

function ConfigGuessCountryFromFlag() {
  const [open, setOpen] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  // Slider state
  const [sliderValue, setSliderValue] = useState(4);
  const [maxNumberOfQuestions, setMaxNumberOfQuestions] = useState(4);

  // Dropdown picker state
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      label: "All",
      value: "All",
    },
    {
      label: "Europe",
      value: "Europe",
    },
    {
      label: "North America",
      value: "North America",
    },
    {
      label: "South America",
      value: "South America",
    },
    {
      label: "Africa",
      value: "Africa",
    },
    {
      label: "Asia",
      value: "Asia",
    },
    {
      label: "Oceania",
      value: "Oceania",
    },
  ]);

  const setMaxNumberOfCountries = () => {
    // Set slider back to 4 (lowest number of questions)
    setSliderValue(4);

    if (value == "Europe") {
      setMaxNumberOfQuestions(48);
    } else if (value == "North America") {
      setMaxNumberOfQuestions(23);
    } else if (value == "South America") {
      setMaxNumberOfQuestions(12);
    } else if (value == "Oceania") {
      setMaxNumberOfQuestions(14);
    } else if (value == "Africa") {
      setMaxNumberOfQuestions(54);
    } else if (value == "Asia") {
      setMaxNumberOfQuestions(44);
    } else {
      setMaxNumberOfQuestions(195);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOURS.background }}>
      <View style={styles.mainContainer}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 20,
              color: COLOURS.white,
              fontFamily: "Helvetica",
            }}
          >
            Guess the Country from the Flag
          </Text>
          <View
            style={{
              borderBottomColor: "white",
              borderBottomWidth: 1,
              marginTop: 10,
              width: "100%",
            }}
          />
        </View>

        {/* Select continent */}
        <View
          style={{
            flex: 2,
            justifyContent: "flex-start",
            paddingHorizontal: 30,
            marginTop: 50,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              color: COLOURS.white,
              textAlign: "center",
              //   fontWeight: "bold",
              fontFamily: "Helvetica",
              letterSpacing: 1,
            }}
          >
            Choose Continent or Select "All"
          </Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            zIndex={10}
            onChangeValue={() => {
              setShowSlider(true), setMaxNumberOfCountries();
            }}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{
              backgroundColor: COLOURS.accent,
              borderColor: COLOURS.white,
              borderWidth: 1,
            }}
            textStyle={{
              fontFamily: "Helvetica",
              fontSize: 18,
              color: COLOURS.black,
            }}
          />
        </View>

        {/* Select number of questions */}
        {showSlider && (
          <View
            style={{ flex: 2, paddingHorizontal: 20, justifyContent: "center" }}
            zIndex={-1}
          >
            <Text
              style={{
                fontSize: 20,
                marginBottom: 20,
                color: COLOURS.white,
                textAlign: "center",
                //   fontWeight: "bold",
                fontFamily: "Helvetica",
                letterSpacing: 1,
              }}
            >
              Number of Questions: {sliderValue}
            </Text>
            <Slider
              value={sliderValue}
              onValueChange={setSliderValue}
              minimumValue={4}
              maximumValue={maxNumberOfQuestions}
              step={1}
              animateTransitions
              animationType="spring"
            />
          </View>
        )}

        {/* Button to proceed to game (and pass props to the game) */}
        <View
          style={{ flex: 2, paddingHorizontal: 20, justifyContent: "center" }}
        >
          <NavButton
            navigateToScreen="GuessCountryFromFlag"
            buttonText="Ready to Go"
            numberOfQuestions={sliderValue}
            continent={value}
          />
        </View>

        <Image
          source={require("../assets/dottedBackground.png")}
          style={{
            width: SIZES.width,
            height: 120,
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
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 16,
    backgroundColor: COLOURS.background,
    position: "relative",
  },
  text: {
    color: COLOURS.white,
    fontSize: 22,
  },
});

export default ConfigGuessCountryFromFlag;
