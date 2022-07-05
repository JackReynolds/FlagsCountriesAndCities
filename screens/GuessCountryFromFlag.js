import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { COLOURS, SIZES } from "../assets/constants";
import testData from "../data/testData";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function GuessCountryFromFlag() {
  const allQuestions = testData;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);

  const validateAnswer = (selectedOption) => {
    let correct_option = allQuestions[currentQuestionIndex].country;
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);
    if (selectedOption == correct_option) {
      // Set score
      setScore(score + 1);
    }
    // Show Next Button
    setShowNextButton(true);
  };

  const renderQuestion = () => {
    const flagPath = allQuestions[currentQuestionIndex].flagImageURL;
    return (
      <View>
        {/* Question Counter */}
        <View style={styles.questionCounter}>
          <Text
            style={{
              color: COLOURS.white,
              fontSize: 20,
              opacity: 0.6,
              marginRight: 2,
            }}
          >
            {currentQuestionIndex + 1} /
          </Text>
          <Text
            style={{
              color: COLOURS.white,
              fontSize: 18,
              opacity: 0.6,
            }}
          >
            {allQuestions.length}
          </Text>
        </View>

        {/* Question */}
        <View style={{ alignItems: "center" }}>
          <Text
            style={{ color: COLOURS.white, fontSize: 22, marginVertical: 10 }}
          >
            Which country does this flag belong to?
          </Text>
          <Image
            source={flagPath}
            style={{
              width: 275,
              height: 200,
              resizeMode: "contain",
            }}
          />
        </View>
      </View>
    );
  };

  const renderOptions = () => {
    // Shuffle array of options
    function shuffleOptions(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    // Get options from array of options - only keeping 3 of the shuffled options
    const options = allQuestions[currentQuestionIndex]?.countryOptions.slice(
      0,
      3
    );

    // Combine options and answer - then shuffle one more time
    const shuffledOptionsAndAnswerArray = [
      ...options,
      allQuestions[currentQuestionIndex]?.country,
    ];
    return (
      <View>
        {shuffledOptionsAndAnswerArray?.map((option) => (
          <TouchableOpacity
            onPress={() => validateAnswer(option)}
            key={option}
            disabled={isOptionsDisabled}
            style={{
              borderWidth: 3,
              borderColor:
                option == correctOption
                  ? COLOURS.success
                  : option == currentOptionSelected
                  ? COLOURS.error
                  : COLOURS.secondary + "40",
              backgroundColor:
                option == correctOption
                  ? COLOURS.success + "20"
                  : option == currentOptionSelected
                  ? COLOURS.error + "20"
                  : COLOURS.secondary + "20",
              height: 60,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 18,
              marginTop: 25,
            }}
          >
            <Text style={{ fontSize: 20, color: COLOURS.white }}>{option}</Text>

            {/* Show check or cross based Icon based on correct answer */}
            {option == correctOption ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: COLOURS.success,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="check"
                  style={{ color: COLOURS.white, fontSize: 20 }}
                />
              </View>
            ) : option == currentOptionSelected ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: COLOURS.error,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="close"
                  style={{ color: COLOURS.white, fontSize: 20 }}
                />
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleNext = () => {
    if (currentQuestionIndex == allQuestions.length + 1) {
      // Last question
      // Show Score Modal
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
  };

  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          style={{
            marginTop: 20,
            width: "100%",
            backgroundColor: COLOURS.accent,
            padding: 20,
            borderRadius: 5,
          }}
          onPress={handleNext}
        >
          <Text
            style={{ fontSize: 20, color: COLOURS.white, textAlign: "center" }}
          >
            Next
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLOURS.primary}
      ></StatusBar>
      <View style={styles.container}></View>

      {/* Progress Bar */}

      {/* Question */}
      {renderQuestion()}

      {/* Options */}
      {renderOptions()}

      {/* Next Button */}
      {renderNextButton()}

      {/* Background Image */}
      <Image
        source={require("../assets/dottedBackground.png")}
        style={{
          width: SIZES.width,
          height: 120,
          zIndex: 0,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          opacity: 0.6,
        }}
        resizeMode={"contain"}
      />
    </View>
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
  questionCounter: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 15,
  },
});
