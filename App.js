import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import CustomButton from "./components/CustomButton";
import GuessCountryFromFlag from "./screens/GuessCountryFromFlag";
import ConfigGuessCountryFromFlag from "./screens/ConfigGuessCountryFromFlag";
import testData from "./data/testData";
import { COLOURS, SIZES } from "./assets/constants";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name={"Home"} component={Home} /> */}
        <Stack.Group>
          <Stack.Screen
            name={"ConfigGuessCountryFromFlag"}
            component={ConfigGuessCountryFromFlag}
          />
          <Stack.Screen
            name={"GuessCountryFromFlag"}
            component={GuessCountryFromFlag}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
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
