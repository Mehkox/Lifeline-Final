import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { colors } from "../theme/colors";
import { createEmptyProfile } from "../utils/medicalStorage";

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

//Custom medical for component that allows users to input their medical information.
//It takes in 3 prop: initialProfile, onSave, and onCancel.
export default function MedicalForm({ initialProfile, onSave, onCancel }) {
  let startingProfile = createEmptyProfile();
  if (initialProfile) {
    startingProfile = initialProfile;
  }
  const [draft, setDraft] = useState(startingProfile);
  const headerHeight = useHeaderHeight();

  // Updates the draft state with new values, newDraft is created with a copy of the current draft.
  function setField(key, value) {
    const newDraft = { ...draft };
    newDraft[key] = value;
    setDraft(newDraft);
  }

  function selectBloodType(type) {
    if (draft.bloodType === type) {
      setField("bloodType", "");
    } else {
      setField("bloodType", type);
    }
  }

  function handleSave() {
    if (draft.fullName.trim() === "" || draft.idNumber.trim() === "") {
      Alert.alert(
        "Missing details",
        "Please enter your name and NRIC / passport number.",
      );
      return;
    }
    onSave(draft);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={headerHeight}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
        <View style={styles.field}>
          <Text style={styles.label}>Full name *</Text>
          <TextInput
            maxLength={60}
            style={styles.input}
            value={draft.fullName}
            onChangeText={(value) => setField("fullName", value)}
            placeholder="As shown on passport"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>NRIC / Passport number *</Text>
          <TextInput
            maxLength={20}
            style={styles.input}
            value={draft.idNumber}
            onChangeText={(value) => setField("idNumber", value)}
            placeholder="e.g. S1234567A"
            placeholderTextColor={colors.textMuted}
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Date of birth</Text>
          <TextInput
            maxLength={10}
            style={styles.input}
            value={draft.dateOfBirth}
            onChangeText={(value) => setField("dateOfBirth", value)}
            placeholder="DD-MM-YYYY"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Blood type</Text>
          <View style={styles.chipRow}>
            {/*Maps the blood data to a pressable chip. Users select their blood type instead of typing it. */}
            {BLOOD_TYPES.map((type) => {
              let chipStyle = styles.chip;
              let chipTextStyle = styles.chipText;

              if (draft.bloodType === type) {
                chipStyle = [styles.chip, styles.chipSelected];
                chipTextStyle = [styles.chipText, styles.chipTextSelected];
              }

              return (
                <Pressable
                  key={type}
                  onPress={() => selectBloodType(type)}
                  style={chipStyle}>
                  <Text style={chipTextStyle}>{type}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Allergies</Text>
          <TextInput
            maxLength={200}
            style={[styles.input, styles.multiline]}
            value={draft.allergies}
            onChangeText={(value) => setField("allergies", value)}
            placeholder="e.g. Penicillin (Itchy rash) Peanuts (Anaphylaxis)"
            placeholderTextColor={colors.textMuted}
            multiline={true}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Long-term medications</Text>
          <TextInput
            maxLength={150}
            style={[styles.input, styles.multiline]}
            value={draft.longTermMedications}
            onChangeText={(value) => setField("longTermMedications", value)}
            placeholder="e.g. Salbutamol inhaler"
            placeholderTextColor={colors.textMuted}
            multiline={true}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Recently taken medications</Text>
          <TextInput
            maxLength={150}
            style={[styles.input, styles.multiline]}
            value={draft.recentMedications}
            onChangeText={(value) => setField("recentMedications", value)}
            placeholder="e.g. Paracetamol 1g at 8am"
            placeholderTextColor={colors.textMuted}
            multiline={true}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>
            Past accidents, injuries or surgeries
          </Text>
          <TextInput
            maxLength={150}
            style={[styles.input, styles.multiline]}
            value={draft.medicalHistory}
            onChangeText={(value) => setField("medicalHistory", value)}
            placeholder="e.g. ACL surgery 2021"
            placeholderTextColor={colors.textMuted}
            multiline={true}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Emergency contact name</Text>
          <TextInput
            maxLength={50}
            style={styles.input}
            value={draft.emergencyName}
            onChangeText={(value) => setField("emergencyName", value)}
            placeholder="e.g. Jane Tan (mother)"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Emergency contact number</Text>
          <TextInput
            maxLength={20}
            style={styles.input}
            value={draft.emergencyPhone}
            onChangeText={(value) => setField("emergencyPhone", value)}
            placeholder="+65 9123 4567"
            placeholderTextColor={colors.textMuted}
            keyboardType="phone-pad"
          />
        </View>

        <Pressable style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save securely</Text>
        </Pressable>
        <Pressable style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 120 },
  field: { marginBottom: 16 },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.textDark,
  },
  multiline: { minHeight: 70, textAlignVertical: "top" },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  chipSelected: { backgroundColor: colors.red, borderColor: colors.red },
  chipText: { fontWeight: "700", color: colors.textDark },
  chipTextSelected: { color: "#fff" },
  button: {
    backgroundColor: colors.navy,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  cancelButton: { padding: 14, alignItems: "center" },
  cancelText: { color: colors.textMuted, fontWeight: "700" },
});
