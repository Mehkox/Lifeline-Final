import { useState, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import { colors } from "../theme/colors";
import {
  saveProfile,
  loadProfile,
  clearProfile,
} from "../utils/medicalStorage";
import MedicalForm from "../components/MedicalForm";
import MedicalProfileView from "../components/MedicalProfileView";
import MedicalQrModal from "../components/MedicalQRModel";

export default function MedicalScreen() {
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [showQR, setShowQR] = useState(false);

  async function unlock() {
    setChecking(true);
    setMessage("");

    try {
      let allowed = false;

      const level = await LocalAuthentication.getEnrolledLevelAsync();

      if (level === LocalAuthentication.SecurityLevel.NONE) {
        allowed = true;
        setMessage(
          "Your phone has no screen lock. Set one up to protect your medical data.",
        );
      } else {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Unlock your medical profile",
          cancelLabel: "Cancel",
          disableDeviceFallback: false,
        });

        if (result.success) {
          allowed = true;
        } else {
          setMessage("Could not unlock. Please try again.");
        }
      }

      if (allowed) {
        const savedProfile = await loadProfile();
        setProfile(savedProfile);
        setUnlocked(true);
      }
    } catch (error) {
      console.log("Unlock error:", error);
      setMessage("Authentication is not available on this device.");
    }

    setChecking(false);
  }

  function lock() {
    setUnlocked(false);
    setProfile(null);
    setEditing(false);
    setShowQR(false);
    setMessage("");
  }

  useFocusEffect(
    useCallback(() => {
      unlock();
      return () => lock();
    }, []),
  );

  async function handleSave(draft) {
    const saved = await saveProfile(draft);
    if (saved === null) {
      Alert.alert(
        "Could not save",
        "Your details could not be saved. Try shortening the longer fields and save again.",
      );
      return;
    }
    setProfile(saved);
    setEditing(false);
  }

  const handleDelete = () => {
    Alert.alert(
      "Delete medical profile?",
      "This permanently removes your medical information from this device.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await clearProfile();
            setProfile(null);
          },
        },
      ],
    );
  };

  if (checking) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.navy} />
      </View>
    );
  }

  if (!unlocked) {
    return (
      <View style={styles.centered}>
        <View style={styles.lockCard}>
          <Ionicons name="finger-print" size={64} color={colors.navy} />
          <Text style={styles.title}>Medical profile locked</Text>
          <Text style={styles.text}>
            {message
              ? message
              : "Authenticate to view your medical information."}
          </Text>
          <Pressable style={styles.button} onPress={unlock}>
            <Text style={styles.buttonText}>Unlock</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  let warningBanner = null;
  if (message) {
    warningBanner = (
      <View style={styles.warning}>
        <Text style={styles.warningText}>{message}</Text>
      </View>
    );
  }

  if (editing) {
    return (
      <View style={{ flex: 1 }}>
        {warningBanner}
        <MedicalForm
          initialProfile={profile}
          onSave={handleSave}
          onCancel={() => setEditing(false)}
        />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.centered}>
        {warningBanner}
        <View style={styles.lockCard}>
          <Ionicons name="medical" size={56} color={colors.red} />
          <Text style={styles.title}>No medical profile yet</Text>
          <Text style={styles.text}>
            Add the details emergency responders and foreign hospitals need to
            treat you safely.
          </Text>
          <Pressable style={styles.button} onPress={() => setEditing(true)}>
            <Text style={styles.buttonText}>Create profile</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {warningBanner}
      <MedicalProfileView
        profile={profile}
        onEdit={() => setEditing(true)}
        onDelete={handleDelete}
        onShowQR={() => setShowQR(true)}
      />
      <MedicalQrModal
        profile={profile}
        visible={showQR}
        onClose={() => setShowQR(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    padding: 24,
  },
  lockCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.textDark,
    marginTop: 16,
    textAlign: "center",
  },
  text: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 8,
  },
  button: {
    backgroundColor: colors.navy,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontWeight: "700" },
  warning: {
    backgroundColor: "#FFF4E5",
    borderColor: colors.orange,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    margin: 16,
    marginBottom: 0,
  },
  warningText: { color: colors.textDark },
});
