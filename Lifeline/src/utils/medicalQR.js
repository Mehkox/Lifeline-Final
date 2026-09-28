export const MAX_RECOMMENDED_LENGTH = 800;
export const MAX_QR_LENGTH = 2000;

function formatUpdatedDate(isoString) {
  if (!isoString) {
    return "";
  }
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}-${month}-${date.getFullYear()}`;
}

function addLine(lines, label, value) {
  if (!value) {
    return;
  }
  const text = value.trim().split("\n").join("; ");
  if (text !== "") {
    lines.push(label + ": " + text);
  }
}

export function buildQrPayload(profile, includeId) {
  const lines = ["LIFELINE MEDICAL INFO"];

  addLine(lines, "Name", profile.fullName);
  if (includeId) {
    addLine(lines, "ID", profile.idNumber);
  }
  addLine(lines, "DOB", profile.dateOfBirth);
  addLine(lines, "Blood", profile.bloodType);
  addLine(lines, "ALLERGIES", profile.allergies);
  addLine(lines, "Long-term meds", profile.longTermMedications);
  addLine(lines, "Recent meds", profile.recentMedications);
  addLine(lines, "History", profile.medicalHistory);

  const contact = profile.emergencyName + " " + profile.emergencyPhone;
  addLine(lines, "Emergency contact", contact);

  const updated = formatUpdatedDate(profile.updatedAt);
  if (updated !== "") {
    lines.push("Updated: " + updated);
  }

  return lines.join("\n");
}
