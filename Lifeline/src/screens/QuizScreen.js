import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { colors } from "../theme/colors";
import { QUIZ_QUESTIONS } from "../data/quizQuestions";
import { pickQuestions, shuffleOptions } from "../utils/quizSelection";
import {
  loadStats,
  saveStats,
  applyRoundResult,
  currentStreak,
  hasPlayedToday,
  tierForScore,
  TIERS,
} from "../utils/quizStats";
import Streak from "../components/Streak";

const ROUND_SIZE = 5;

export default function QuizScreen() {
  const [stats, setStats] = useState(null);
  const [stage, setStage] = useState("start");
  const [round, setRound] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [wasPractice, setWasPractice] = useState(false);

  useEffect(() => {
    loadStats().then(setStats);
  }, []);
// Starts a new round and pick 5 questions at random. Also shuffle the options for each question.
// Set the state for the round, practice, index, selected, answers, and stage. 
  const startRound = useCallback(() => {
    const picked = pickQuestions(
      QUIZ_QUESTIONS,
      stats.questionStats,
      ROUND_SIZE,
    );
    setRound(
      picked.map((question) => ({ ...question, ...shuffleOptions(question) })),
    );
    setWasPractice(hasPlayedToday(stats));
    setIndex(0);
    setSelected(null);
    setAnswers([]);
    setStage("playing");
  }, [stats]);

    // Handles the answer selection for each question.
  const answer = (optionIndex) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    const question = round[index];
    setAnswers((prev) => [
      ...prev,
      {
        questionId: question.id,
        correct: optionIndex === question.answer,
        chosen: optionIndex,
      },
    ]);
  };

  const next = async () => {
    if (index < round.length - 1) {
      setIndex(index + 1);
      setSelected(null);
      return;
    }
    const score = answers.filter((a) => a.correct).length;
    const updated = applyRoundResult(stats, { score, answers });
    setStats(updated);
    await saveStats(updated);
    setStage("results");
  };

  if (!stats) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.navy} />
      </View>
    );
  }

  //Start screen
  if (stage === "start") {
    const streak = currentStreak(stats);
    const playedToday = hasPlayedToday(stats);
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}>
        <View style={styles.streakCard}>
          <Text style={styles.streakNumber}>{streak}</Text>
          <Text style={styles.streakLabel}>day streak</Text>
          {stats.bestStreak > 0 && (
            <Text style={styles.best}>Best: {stats.bestStreak} days</Text>
          )}
        </View>

        {stats.history.length > 0 && (
          <View style={styles.card}>
            <Streak history={stats.history} />
          </View>
        )}

        <Text style={styles.heading}>
          {playedToday ? "Today's round is done" : "5 questions today"}
        </Text>
        <Text style={styles.body}>
          {playedToday
            ? "You can keep practising, but only the first round each day counts towards your streak."
            : "Answer five questions on emergency preparedness. Questions you get wrong come back sooner."}
        </Text>

        <Pressable style={styles.primaryButton} onPress={startRound}>
          <Text style={styles.primaryText}>
            {playedToday ? "Practice round" : "Start today's quiz"}
          </Text>
        </Pressable>

        <View style={styles.legend}>
          {Object.entries(TIERS).map(([score, tier]) => (
            <View key={score} style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: tier.color }]}
              />
              <Text style={styles.legendText}>
                {score} · {tier.name}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }

  // Playing
  if (stage === "playing") {
    const question = round[index];
    const answered = selected !== null;
    const correct = answered && selected === question.answer;

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}>
        <Text style={styles.progress}>
          Question {index + 1} of {round.length}
          {wasPractice ? "  ·  Practice" : ""}
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((index + 1) / round.length) * 100}%` },
            ]}
          />
        </View>

        <Text style={styles.category}>{question.category}</Text>
        <Text style={styles.prompt}>{question.prompt}</Text>

        {question.options.map((option, i) => {
          const isAnswer = i === question.answer;
          const isChosen = i === selected;
          return (
            <Pressable
              key={option}
              onPress={() => answer(i)}
              disabled={answered}
              style={[
                styles.option,
                answered && isAnswer && styles.optionCorrect,
                answered && isChosen && !isAnswer && styles.optionWrong,
              ]}>
              <Text
                style={[
                  styles.optionText,
                  answered &&
                    (isAnswer || isChosen) && {
                      color: "#fff",
                      fontWeight: "800",
                    },
                ]}>
                {option}
              </Text>
            </Pressable>
          );
        })}

        {answered && (
          <View style={styles.explanation}>
            <Text
              style={[
                styles.verdict,
                { color: correct ? colors.teal : colors.red },
              ]}>
              {correct ? "Correct" : "Not quite"}
            </Text>
            <Text style={styles.body}>{question.explanation}</Text>
            <Pressable style={styles.primaryButton} onPress={next}>
              <Text style={styles.primaryText}>
                {index < round.length - 1 ? "Next question" : "See results"}
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    );
  }

  // Results
  const score = answers.filter((a) => a.correct).length;
  const tier = tierForScore(score);
  const missed = answers
    .map((a, i) => ({ ...a, question: round[i] }))
    .filter((a) => !a.correct);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.tierBadge, { borderColor: tier.color }]}>
        <View style={[styles.tierDot, { backgroundColor: tier.color }]} />
        <Text style={styles.tierName}>{tier.name}</Text>
        <Text style={styles.score}>
          {score} / {round.length}
        </Text>
      </View>

      {wasPractice ? (
        <Text style={styles.body}>
          Practice round, so your streak is unchanged. Your answers still shape
          which questions come up next.
        </Text>
      ) : (
        <Text style={styles.body}>
          Streak: {currentStreak(stats)} day
          {currentStreak(stats) === 1 ? "" : "s"}. Come back tomorrow to keep it
          going.
        </Text>
      )}

      {missed.length > 0 && (
        <>
          <Text style={styles.heading}>Worth reviewing</Text>
          {missed.map(({ question }) => (
            <View key={question.id} style={styles.card}>
              <Text style={styles.reviewPrompt}>{question.prompt}</Text>
              <Text style={styles.reviewAnswer}>
                {question.options[question.answer]}
              </Text>
              <Text style={styles.body}>{question.explanation}</Text>
            </View>
          ))}
        </>
      )}

      <Pressable style={styles.primaryButton} onPress={() => setStage("start")}>
        <Text style={styles.primaryText}>Done</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 48 },
  centered: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  streakCard: {
    backgroundColor: colors.navy,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
  },
  streakNumber: { fontSize: 48, fontWeight: "900", color: "#fff" },
  streakLabel: {
    color: "#C9D4E3",
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    fontSize: 11,
  },
  best: { color: "#C9D4E3", fontSize: 12, marginTop: 8 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginTop: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.textDark,
    marginTop: 24,
  },
  body: { fontSize: 14, lineHeight: 21, color: colors.textMuted, marginTop: 8 },
  primaryButton: {
    backgroundColor: colors.navy,
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
  },
  primaryText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  legend: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 28 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendDot: { width: 12, height: 12, borderRadius: 6 },
  legendText: { fontSize: 12, color: colors.textMuted },
  progress: { fontSize: 12, fontWeight: "700", color: colors.textMuted },
  progressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    marginTop: 8,
    overflow: "hidden",
  },
  progressFill: { height: 6, backgroundColor: colors.teal },
  category: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.teal,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginTop: 24,
  },
  prompt: {
    fontSize: 19,
    fontWeight: "800",
    color: colors.textDark,
    marginTop: 8,
    marginBottom: 20,
    lineHeight: 26,
  },
  option: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },
  optionCorrect: { backgroundColor: colors.teal, borderColor: colors.teal },
  optionWrong: { backgroundColor: colors.red, borderColor: colors.red },
  optionText: { fontSize: 15, color: colors.textDark },
  explanation: { marginTop: 8 },
  verdict: { fontSize: 16, fontWeight: "900" },
  tierBadge: {
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 24,
    padding: 28,
    backgroundColor: colors.card,
  },
  tierDot: { width: 44, height: 44, borderRadius: 22 },
  tierName: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.textDark,
    marginTop: 12,
  },
  score: { fontSize: 15, color: colors.textMuted, marginTop: 4 },
  reviewPrompt: { fontWeight: "800", color: colors.textDark },
  reviewAnswer: { color: colors.teal, fontWeight: "700", marginTop: 6 },
});
