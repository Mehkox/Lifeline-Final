import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "lifeline_quiz_stats";

// Tier for each score. TIERS[0] is 0 correct, TIERS[5] is 5 correct.
export const TIERS = [
  { name: "Attempted", color: "#9AA5B1" },
  { name: "Bronze", color: "#B87333" },
  { name: "Silver", color: "#A8B2BD" },
  { name: "Gold", color: "#E0A72C" },
  { name: "Platinum", color: "#7FA8C9" },
  { name: "Diamond", color: "#3FC8E4" },
];

export function tierForScore(score) {
  if (TIERS[score]) {
    return TIERS[score];
  }
  return TIERS[0];
}

// Turns a date into a string like "2026-09-24".
export function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getToday() {
  return dateKey(new Date());
}

function getYesterday() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return dateKey(date);
}

function createEmptyStats() {
  return {
    streak: 0,
    bestStreak: 0,
    lastPlayedDate: null,
    history: [],
    questionStats: {},
  };
}

export function applyRoundResult(stats, { score, answers }) {
  const newStats = JSON.parse(JSON.stringify(stats));
  const today = getToday();

  for (let i = 0; i < answers.length; i++) {
    const id = answers[i].questionId;

    if (!newStats.questionStats[id]) {
      newStats.questionStats[id] = { correct: 0, wrong: 0 };
    }

    if (answers[i].correct) {
      newStats.questionStats[id].correct += 1;
    } else {
      newStats.questionStats[id].wrong += 1;
    }
  }

  // Practice round.
  if (stats.lastPlayedDate === today) {
    return newStats;
  }

  if (stats.lastPlayedDate === getYesterday()) {
    newStats.streak = stats.streak + 1;
  } else {
    newStats.streak = 1;
  }

  if (newStats.streak > newStats.bestStreak) {
    newStats.bestStreak = newStats.streak;
  }

  newStats.lastPlayedDate = today;
  newStats.history.push({ date: today, score: score });

  if (newStats.history.length > 30) {
    newStats.history.shift();
  }

  return newStats;
}

// If the last round was before yesterday, the streak is broken.
export function currentStreak(stats) {
  if (
    stats.lastPlayedDate === getToday() ||
    stats.lastPlayedDate === getYesterday()
  ) {
    return stats.streak;
  }
  return 0;
}

export function hasPlayedToday(stats) {
  return stats.lastPlayedDate === getToday();
}

export async function loadStats() {
  try {
    const saved = await AsyncStorage.getItem(KEY);
    if (saved === null) {
      return createEmptyStats();
    }
    return JSON.parse(saved);
  } catch (error) {
    console.log("Failed to load quiz stats:", error);
    return createEmptyStats();
  }
}

export async function saveStats(stats) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(stats));
  } catch (error) {
    console.log("Failed to save quiz stats:", error);
  }
}
