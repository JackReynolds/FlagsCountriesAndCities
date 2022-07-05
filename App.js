import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-web";
import CustomButton from "./components/CustomButton";
import GuessCountryFromFlag from "./screens/GuessCountryFromFlag";
import testData from "./data/testData";
import { COLOURS, SIZES } from "./assets/constants";

export default function App() {
  return <GuessCountryFromFlag />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headingsContainer: {
    flex: 2,
  },
  mainHeading: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 75,
    flex: 1,
  },
  subHeading: {
    flex: 1,
    fontSize: 20,
    textAlign: "center",
  },
  buttonList: {
    flex: 4,
    alignItems: "center",
  },
});
