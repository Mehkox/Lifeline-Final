import * as SecureStore from "expo-secure-store";

const KEY = "lifeline_medical_profile";

export function createEmptyProfile() {
  return {
    fullName: "",
    idNumber: "",
    dateOfBirth: "",
    bloodType: "",
    allergies: "",
    longTermMedications: "",
    recentMedications: "",
    medicalHistory: "",
    emergencyName: "",
    emergencyPhone: "",
    updatedAt: null,
  };
}

// Returns the saved profile, or null if saving failed.
export async function saveProfile(profile) {
  const toSave = { ...profile };
  toSave.updatedAt = new Date().toISOString();

  try {
    await SecureStore.setItemAsync(KEY, JSON.stringify(toSave));
    return toSave;
  } catch (error) {
    console.log("Failed to save medical profile:", error);
    return null;
  }
}

export async function loadProfile() {
  try {
    const saved = await SecureStore.getItemAsync(KEY);
    if (saved === null) {
      return null;
    }
    return JSON.parse(saved);
  } catch (error) {
    console.log("Failed to load medical profile:", error);
    return null;
  }
}

export async function clearProfile() {
  await SecureStore.deleteItemAsync(KEY);
}
