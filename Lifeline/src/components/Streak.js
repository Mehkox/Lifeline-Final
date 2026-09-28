import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { tierForScore, dateKey } from "../utils/quizStats";

const DAYS_SHOWN = 14;
// Display the streak
export default function Streak({ history }) {
  const byDate = {};
  // Loop through history and map the date to the score for each entry.
  history.forEach((entry) => {
    byDate[entry.date] = entry.score;
  });
// Create an array of days
  const days = [];
  //loop through and create new date object for each day.
  for (let offset = DAYS_SHOWN - 1; offset >= 0; offset -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - offset);
    const key = dateKey(date);
    days.push({ key, score: byDate[key] });
  }

  return (
    <View>
      <View style={styles.row}>
        {days.map((day) => (
          <View
            key={day.key}
            style={[
              styles.dot,
              day.score === undefined
                ? styles.dotEmpty
                : { backgroundColor: tierForScore(day.score).color },
            ]}
          />
        ))}
      </View>
      <Text style={styles.caption}>Last {DAYS_SHOWN} days</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 6, flexWrap: "wrap" },
  dot: { width: 16, height: 16, borderRadius: 8 },
  dotEmpty: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.border,
  },
  caption: { fontSize: 11, color: colors.textMuted, marginTop: 8 },
});
