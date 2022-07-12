import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLOURS, SIZES } from "../assets/constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import testData from "../data/testData";
import { useFocusEffect } from "@react-navigation/native";
const allCountries = testData;
let applicableCountriesArray = [];
let quiz = [];
let listOfAllCountries = allCountries.map((country) => country.country);

export default function GuessCountryFromFlag({ route, navigation }) {
  // Props from config page
  const { continent, numberOfQuestions } = route.params;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [optionsAndAnswer, setOptionsAndAnswer] = useState([]);

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  // Function to get random select number of entities from an array
  function getRandom(arr, n) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  // Function to check if an array has duplicates (returns yes) or no (returns false)
  function containsDuplicates(array) {
    if (array.length !== new Set(array).size) {
      return true;
    }
    return false;
  }

  const checkContinent = (country) => {
    if (continent == "All") {
      return country;
    } else if (country.continent == continent) {
      return country;
    }
  };

  // Shuffle and check for duplicates
  const removeDuplicates = (arrayOfOptions, country) => {
    while (containsDuplicates([...arrayOfOptions, country])) {
      //arrayOfOptions = shuffleArray(listOfAllCountries);
      arrayOfOptions = getRandom(listOfAllCountries, 3);
    }
    // console.log([...arrayOfOptions, country]);
    // return [...arrayOfOptions, country];
    return arrayOfOptions;
  };

  // On page load - get list of countries based upon continent and numberOfQuestions (selected on previous page)
  useEffect(() => {
    applicableCountriesArray = shuffleArray(
      testData
        //.filter((country) => country.continent == continent)
        .filter((country) => checkContinent(country))
        .map((country) => ({
          country: country.country,
          flagImageURL: country.flagImageURL,
        }))
    ).slice(0, numberOfQuestions);

    const listOfContinentCountries = allCountries
      .filter((country) => checkContinent(country))
      .map((country) => country.country);

    // build quiz object with country and options
    for (let i = 0; i < applicableCountriesArray.length; i++) {
      quiz[i] = {
        flagImageURL: applicableCountriesArray[i].flagImageURL,
        country: applicableCountriesArray[i].country,
        options: [
          ...shuffleArray([
            ...removeDuplicates(
              // can either have "listOfContinentCountries" to have all countries from the same continent
              // or, can select listOfAllCountries to have it completely random
              getRandom(listOfContinentCountries, 3),
              applicableCountriesArray[i]
            ),
            applicableCountriesArray[i].country,
          ]),
        ],
      };
    }

    setOptionsAndAnswer(quiz);
  }, []);

  // const checkNumberOfCountriesInContinent = () => {
  //   let numberOfAsia = 0;
  //   let numberOfNorthAmerica = 0;
  //   let numberOfSouthAmerica = 0;
  //   let numberOfEurope = 0;
  //   let numberOfOceania = 0;
  //   let numberOfAfrica = 0;
  //   testData.forEach((country) => {
  //     if (country.continent == "Asia") numberOfAsia += 1;
  //     if (country.continent == "North America") numberOfNorthAmerica += 1;
  //     if (country.continent == "South America") numberOfSouthAmerica += 1;
  //     if (country.continent == "Europe") numberOfEurope += 1;
  //     if (country.continent == "Oceania") numberOfOceania += 1;
  //     if (country.continent == "Africa") numberOfAfrica += 1;
  //   });

  //   console.log(`${numberOfAsia} countries in Asia`);
  //   console.log(`${numberOfNorthAmerica} countries in North America`);
  //   console.log(`${numberOfSouthAmerica} countries in South America`);
  //   console.log(`${numberOfEurope} countries in Europe`);
  //   console.log(`${numberOfOceania} countries in Oceania`);
  //   console.log(`${numberOfAfrica} countries in Africa`);
  //   console.log(
  //     `Total number of countries: ${
  //       numberOfAsia +
  //       numberOfNorthAmerica +
  //       numberOfSouthAmerica +
  //       numberOfEurope +
  //       numberOfOceania +
  //       numberOfAfrica
  //     }`
  //   );
  // };

  const validateAnswer = (selectedOption) => {
    let correct_option = applicableCountriesArray[currentQuestionIndex].country;
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

  const renderOptions = () => {
    //  optionsAndAnswer && console.log(optionsAndAnswer);
    return (
      <View>
        {optionsAndAnswer && (
          <View>
            {optionsAndAnswer[currentQuestionIndex]?.options.map(
              (option, id) => (
                <TouchableOpacity
                  onPress={() => validateAnswer(option)}
                  key={id}
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
                    borderRadius: 18,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 18,
                    marginTop: 25,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: COLOURS.white,
                      fontFamily: "Helvetica",
                    }}
                  >
                    {option}
                  </Text>

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
              )
            )}
          </View>
        )}
      </View>
    );
  };

  const renderQuestion = () => {
    // const flagPath = allCountries[currentQuestionIndex]?.flagImageURL;
    const flagPath = optionsAndAnswer[currentQuestionIndex]?.flagImageURL;
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
            {numberOfQuestions}
          </Text>
        </View>

        {/* Question */}
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: COLOURS.white,
              fontSize: 22,
              marginVertical: 10,
              fontFamily: "Helvetica",
            }}
          >
            Which country does this flag belong to?
          </Text>
          <Image
            source={flagPath}
            style={{
              width: 225,
              height: 150,
              resizeMode: "contain",
            }}
          />
        </View>
      </View>
    );
  };

  // const generateNewOptionsAndAnswer = () => {
  //   // const newOptionsAndAnswer = shuffleArray([...optionsAndAnswer]);
  //   let newOptionsAndAnswer = [
  //     ...getRandom(allCountriesArray, 3),
  //     allCountries[currentQuestionIndex + 1]?.country,
  //   ];

  //   // Ensure there are no duplicates between options and country
  //   while (containsDuplicates(newOptionsAndAnswer)) {
  //     newOptionsAndAnswer = [
  //       ...getRandom(allCountriesArray, 3),
  //       allCountries[currentQuestionIndex]?.country,
  //     ];
  //   }
  //   shuffleArray(newOptionsAndAnswer);
  //   setOptionsAndAnswer(newOptionsAndAnswer);
  // };

  const handleNext = () => {
    if (currentQuestionIndex == applicableCountriesArray.length - 1) {
      // Last question
      // Show Score Modal
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);

      // Must be ran after the index is changed
      // generateNewOptionsAndAnswer();
    }

    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
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
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: COLOURS.white,
              textAlign: "center",
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  // const renderQuitButton = () => {
  //   console.log("quit");
  // };

  // Progress Bar
  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, applicableCountriesArray.length],
    outputRange: ["0%", "100%"],
  });
  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 20,
          borderRadius: 20,
          backgroundColor: "#00000020",
        }}
      >
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: COLOURS.accent,
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </View>
    );
  };

  // Restart Quiz Modal
  const restartQuiz = () => {
    setShowScoreModal(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);

    // Create new optionsAndAnswers

    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOURS.background }}>
      <View style={styles.mainContainer}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={COLOURS.primary}
        ></StatusBar>
        <View style={styles.container}></View>
        {/* Progress Bar */}
        {renderProgressBar()}
        {/* Question */}
        {renderQuestion()}
        {/* Options */}
        {renderOptions()}
        {/* Next Button */}
        {renderNextButton()}
        {/* {checkNumberOfCountriesInContinent()} */}

        {/* Score Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showScoreModal}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: COLOURS.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: COLOURS.white,
                width: "90%",
                borderRadius: 20,
                padding: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                {score > applicableCountriesArray.length / 2
                  ? "Congratulations!"
                  : "Oops!"}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginVertical: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    color:
                      score > applicableCountriesArray.length / 2
                        ? COLOURS.success
                        : COLOURS.error,
                  }}
                >
                  {score}
                </Text>
                <Text style={{ fontSize: 20, color: COLOURS.black }}>
                  {" "}
                  / {applicableCountriesArray.length}
                </Text>
              </View>

              {/* Retry quiz button */}
              <TouchableOpacity
                onPress={restartQuiz}
                style={{
                  backgroundColor: COLOURS.accent,
                  padding: 20,
                  width: "100%",
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: COLOURS.white,
                    fontSize: 20,
                  }}
                >
                  Retry Quiz?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Background Image */}
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
  questionCounter: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 15,
  },
});
