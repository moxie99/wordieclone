import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { colors } from "./Wordle Assets/src/constants";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Wordie</Text>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    color: colors.lightgrey,
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 7,
    textTransform: "uppercase",
    paddingTop: 30,
  },
});
