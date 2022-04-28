import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { colors, CLEAR, ENTER } from "./Wordle Assets/src/constants";
import Keyboard from "./Wordle Assets/src/components/Keyboard";

//the number of trials for word guess
const numberOfTrials = 6;

//the resulting data for each trial of the game: a bi-dimensional array, which is an array(rows) created based on length of trials and columns based on numbers of trials
// const rows = new Array(numberOfTrials).fill(
//   new Array(letters.length).fill("a")
// );
const copyArray = (arr) => {
  return [...arr.map((rows) => [...rows])];
};
export default function App() {
  //the number of rows depends on the length of the word
  const word = "hello";
  const letters = word.split("");

  //state will be used to monitor the state of the rows, the default row is passed as initial parameter
  const [rows, setRows] = useState(
    new Array(numberOfTrials).fill(new Array(letters.length).fill(""))
  );

  //monitoring rows and columns of arrays
  const [currentRow, setCurrentRow] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);

  useEffect(() => {
    if (currentRow > 0) {
      checkGameState();
    }
  }, [currentRow]);

  const checkGameState = () => {
    if (checkIfWon()) {
      Alert.alert("Hurray, You've started the day very well");
    } else if (checkIfLost) {
      Alert.alert("You Lost, try again tomorrow, you will do well.");
    }
  };

  const checkIfWon = () => {
    const row = rows[currentRow - 1];
    return row.every((cell, i) => cell === letters[i]);
  };
  const checkIfLost = () => {
    return currentRow === rows.length;
  };
  //keyboard pressed function
  const onKeyPressed = (key) => {
    const updatedRows = copyArray(rows);

    // action for when clear is pressed
    if (key === CLEAR) {
      const previousColumn = currentColumn - 1;
      if (previousColumn >= 0) {
        updatedRows[currentRow][previousColumn] = "";
        setRows(updatedRows);
        setCurrentColumn(previousColumn);
      }
      return;
    }
    // action for enter button
    if (key === ENTER) {
      if (currentColumn === rows[0].length) {
        setCurrentRow(currentRow + 1);
        setCurrentColumn(0);
      }
      return;
    }
    // action to hinder when going beyond the column length
    if (currentColumn < rows[0].length) {
      updatedRows[currentRow][currentColumn] = key;
      setRows(updatedRows);
      setCurrentColumn(currentColumn + 1);
    }
  };

  const isCellActive = (row, column) => {
    return row === currentRow && column === currentColumn;
  };

  //
  const getCellBGColor = (row, column) => {
    const cell = rows[row][column];

    if (row >= currentRow) {
      return colors.black;
    }
    if (cell === letters[column]) {
      return colors.primary;
    }
    if (letters.includes(cell)) {
      return colors.secondary;
    }
    return colors.darkgrey;
  };

  // setting the keyboard key colors based on the state of the keys entered
  // the major function
  const getAllLettersWithColors = (colors) => {
    return rows.flatMap((row, i) =>
      row.filter((cell, j) => getCellBGColor(i, j) === colors)
    );
  };
  // the individual colors
  const greenCaps = getAllLettersWithColors(colors.primary);
  const yellowCaps = getAllLettersWithColors(colors.secondary);
  const greyCaps = getAllLettersWithColors(colors.darkgrey);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Wordie</Text>
      <ScrollView style={styles.map}>
        {rows.map((row, i) => (
          <View key={`row${i}`} style={styles.row}>
            {row.map((cell, j) => (
              <View
                key={`cell-${i}-${j}`}
                style={[
                  styles.cell,
                  {
                    borderColor: isCellActive(i, j)
                      ? colors.darkgrey
                      : colors.lightgrey,
                    backgroundColor: getCellBGColor(i, j),
                  },
                ]}
              >
                <Text style={styles.character}>{cell.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <Keyboard
        onKeyPressed={onKeyPressed}
        greenCaps={greenCaps}
        yellowCaps={yellowCaps}
        greyCaps={greyCaps}
      />
    </SafeAreaView>
  );
}

// styles
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
    paddingTop: 60,
  },
  map: {
    alignSelf: "stretch",
    marginVertical: 20,
  },
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
  },
  cell: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 1,
    maxWidth: 70,
    borderColor: colors.lightgrey,
    marginStart: 3,
    marginEnd: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  character: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
});
