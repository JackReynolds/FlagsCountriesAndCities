import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "./components/CustomButton";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.headingsContainer}>
        <Text style={styles.mainHeading}>Flags, Countries and Capitals</Text>
        <Text style={styles.subHeading}>Select a game mode from below..</Text>
      </View>
      <View style={styles.buttonList}>
        <CustomButton text="Guess country from flag"></CustomButton>
        <CustomButton text="Guess capital of country"></CustomButton>
        <CustomButton text="Guess country from capital"></CustomButton>
        <CustomButton text="Guess country from famous attraction"></CustomButton>
        <CustomButton text="Guess country from a fact/statement"></CustomButton>
      </View>
      <StatusBar style="auto" />
    </View>
  );
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
