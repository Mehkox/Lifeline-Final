import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { TIPS } from "../data/tips";
import TipDetailModel from "../components/TipDetailModel";

const EMERGENCY_NUMBERS = [
  { label: "Ambulance / Fire", number: "995", icon: "medkit" },
  { label: "Police", number: "999", icon: "shield" },
  { label: "Non-emergency ambulance", number: "1777", icon: "car" },
];

export default function HomeScreen({ navigation }) {
  const [selectedTip, setSelectedTip] = useState(null);

  const call = (number) => Linking.openURL(`tel:${number}`);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>Emergency preparedness</Text>
        <Text style={styles.appName}>Lifeline</Text>

        {/* Quick actions */}
        <View style={styles.actionRow}>
          <Pressable
            style={styles.actionCard}
            onPress={() => navigation.navigate("Medical")}>
            <View style={[styles.actionIcon, { backgroundColor: "#FDECEE" }]}>
              <Ionicons name="medical" size={24} color={colors.red} />
            </View>
            <Text style={styles.actionTitle}>Medical profile</Text>
            <Text style={styles.actionSub}>Locked & encrypted</Text>
          </Pressable>

          <Pressable
            style={styles.actionCard}
            onPress={() => navigation.navigate("Quiz")}>
            <View style={[styles.actionIcon, { backgroundColor: "#E6F4F1" }]}>
              <Ionicons name="grid" size={24} color={colors.teal} />
            </View>
            <Text style={styles.actionTitle}>Daily Quiz</Text>
            <Text style={styles.actionSub}>Test your knowledge</Text>
          </Pressable>
        </View>

        {/* Emergency numbers */}
        <Text style={styles.sectionTitle}>Emergency numbers</Text>
        <View style={styles.card}>
          {EMERGENCY_NUMBERS.map((item, index) => (
            <Pressable
              key={item.number}
              style={[styles.numberRow, index > 0 && styles.divider]}
              onPress={() => call(item.number)}>
              <Ionicons name={item.icon} size={20} color={colors.navy} />
              <View style={{ flex: 1 }}>
                <Text style={styles.numberLabel}>{item.label}</Text>
                <Text style={styles.numberValue}>{item.number}</Text>
              </View>
              <Ionicons name="call" size={18} color={colors.teal} />
            </Pressable>
          ))}
        </View>
        <Text style={styles.note}>Numbers shown are for Singapore.</Text>

        {/* Tips */}
        <Text style={styles.sectionTitle}>Preparedness tips</Text>
        {TIPS.map((tip) => (
          <Pressable
            key={tip.id}
            style={styles.tipCard}
            onPress={() => setSelectedTip(tip)}>
            <View style={styles.tipIcon}>
              <Ionicons name={tip.icon} size={20} color={colors.navy} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipShort}>{tip.short}</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.textMuted}
            />
          </Pressable>
        ))}
      </ScrollView>

      <TipDetailModel tip={selectedTip} onClose={() => setSelectedTip(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 56, paddingBottom: 40 },
  eyebrow: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.teal,
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  appName: {
    fontSize: 30,
    fontWeight: "900",
    color: colors.textDark,
    marginTop: 2,
    marginBottom: 20,
  },
  actionRow: { flexDirection: "row", gap: 12 },
  actionCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  actionTitle: { fontWeight: "800", color: colors.textDark },
  actionSub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.teal,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginTop: 28,
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
  },
  numberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
  },
  divider: { borderTopWidth: 1, borderTopColor: colors.border },
  numberLabel: { fontSize: 13, color: colors.textMuted },
  numberValue: { fontSize: 18, fontWeight: "800", color: colors.textDark },
  note: { fontSize: 12, color: colors.textMuted, marginTop: 8 },
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 10,
  },
  tipIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.cardAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  tipTitle: { fontWeight: "800", color: colors.textDark },
  tipShort: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
});
