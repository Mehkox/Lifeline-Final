import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Linking,
} from "react-native";
import { colors } from "../theme/colors";

function Section({ title, value, danger }) {
  return (
    <View style={[styles.card, danger && styles.cardDanger]}>
      <Text style={[styles.cardTitle, danger && { color: colors.red }]}>
        {title}
      </Text>
      <Text style={styles.value}>
        {value?.trim() ? value : "None recorded"}
      </Text>
    </View>
  );
}

export default function MedicalProfileView({
  profile,
  onEdit,
  onDelete,
  onShowQR,
}) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.identity}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{profile.fullName}</Text>
          {!!profile.idNumber && (
            <Text style={styles.sub}>{profile.idNumber}</Text>
          )}
          {!!profile.dateOfBirth && (
            <Text style={styles.sub}>{profile.dateOfBirth}</Text>
          )}
        </View>
        <View style={styles.bloodBadge}>
          <Text style={styles.bloodLabel}>BLOOD</Text>
          <Text style={styles.bloodValue}>{profile.bloodType || "?"}</Text>
        </View>
      </View>

      <Section title="Allergies" value={profile.allergies} danger />
      <Section
        title="Long-term medications"
        value={profile.longTermMedications}
      />
      <Section title="Recently taken" value={profile.recentMedications} />
      <Section
        title="Past accidents, injuries & surgeries"
        value={profile.medicalHistory}
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Emergency contact</Text>
        <Text style={styles.value}>{profile.emergencyName || "Not set"}</Text>
        {!!profile.emergencyPhone && (
          <Pressable
            style={styles.callButton}
            onPress={() =>
              Linking.openURL(
                `tel:${profile.emergencyPhone.replace(/\s/g, "")}`,
              )
            }>
            <Text style={styles.callText}>Call {profile.emergencyPhone}</Text>
          </Pressable>
        )}
      </View>

      <Pressable style={styles.primaryButton} onPress={onShowQR}>
        <Text style={styles.primaryText}>Show QR for medical staff</Text>
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={onEdit}>
        <Text style={styles.secondaryText}>Edit profile</Text>
      </Pressable>
      <Pressable style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteText}>Delete profile</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 48 },
  identity: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.navy,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  name: { fontSize: 22, fontWeight: "900", color: "#fff" },
  sub: { color: "#C9D4E3", marginTop: 4 },
  bloodBadge: {
    backgroundColor: colors.red,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  bloodLabel: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  bloodValue: { color: "#fff", fontSize: 24, fontWeight: "900" },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardDanger: { borderColor: colors.red, backgroundColor: "#FFF7F8" },
  cardTitle: { fontWeight: "800", color: colors.textDark, marginBottom: 6 },
  value: { color: colors.textDark, fontSize: 15 },
  callButton: {
    backgroundColor: colors.teal,
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  callText: { color: "#fff", fontWeight: "700" },
  primaryButton: {
    backgroundColor: colors.navy,
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  primaryText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.navy,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    marginTop: 10,
  },
  secondaryText: { color: colors.navy, fontWeight: "700" },
  deleteButton: { padding: 14, alignItems: "center" },
  deleteText: { color: colors.red, fontWeight: "700" },
});
