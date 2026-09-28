import { useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  ScrollView,
  Switch,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { colors } from "../theme/colors";
import {
  buildQrPayload,
  MAX_QR_LENGTH,
  MAX_RECOMMENDED_LENGTH,
} from "../utils/medicalQR";

export default function MedicalQrModal({ visible, profile, onClose }) {
  const [includeId, setIncludeId] = useState(false);
  const screenWidth = useWindowDimensions().width;
  const qrSize = Math.min(screenWidth - 96, 280);

  if (!profile) {
    return null;
  }

  const payload = buildQrPayload(profile, includeId);
  const tooLong = payload.length > MAX_RECOMMENDED_LENGTH;
  const tooBig = payload.length > MAX_QR_LENGTH;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Show this to medical staff</Text>
          <Text style={styles.subtitle}>
            Any phone camera can read this. It works offline and no app is
            needed.
          </Text>

          {tooBig ? (
            <View style={styles.warning}>
              <Text style={styles.warningText}>
                Too much information to fit in a QR code. Please shorten your
                notes. Medical staff can still read the text below.
              </Text>
            </View>
          ) : (
            <View style={styles.qrWrapper}>
              <QRCode
                value={payload}
                size={qrSize}
                backgroundColor="#FFFFFF"
                color="#000000"
                ecl="L"
              />
            </View>
          )}

          <View style={styles.toggleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.toggleLabel}>
                Include NRIC / passport number
              </Text>
              <Text style={styles.toggleHint}>
                Anyone who scans the code can read it. Only turn this on when
                asked.
              </Text>
            </View>
            <Switch
              value={includeId}
              onValueChange={setIncludeId}
              trackColor={{ true: colors.teal, false: colors.border }}
            />
          </View>

          {tooLong && !tooBig && (
            <View style={styles.warning}>
              <Text style={styles.warningText}>
                Your details are long ({payload.length} characters), so the code
                is dense and may be harder to scan. Shortening your notes will
                make it easier to read.
              </Text>
            </View>
          )}

          <Text style={styles.previewTitle}>What the scanner will show</Text>
          <View style={styles.preview}>
            <Text style={styles.previewText}>{payload}</Text>
          </View>

          <Text style={styles.tip}>
            Tip: turn your screen brightness up before showing the code.
          </Text>

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24, paddingTop: 48, alignItems: "center" },
  title: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.textDark,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20,
  },
  qrWrapper: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginTop: 20,
    width: "100%",
  },
  toggleLabel: { fontWeight: "700", color: colors.textDark },
  toggleHint: { fontSize: 12, color: colors.textMuted, marginTop: 4 },
  warning: {
    backgroundColor: "#FFF4E5",
    borderColor: colors.orange,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    width: "100%",
  },
  warningText: { color: colors.textDark, fontSize: 13 },
  previewTitle: {
    alignSelf: "flex-start",
    fontSize: 12,
    fontWeight: "800",
    color: colors.teal,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginTop: 24,
    marginBottom: 8,
  },
  preview: {
    backgroundColor: colors.cardAlt,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    width: "100%",
  },
  previewText: { color: colors.textDark, fontSize: 13, lineHeight: 20 },
  tip: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 16,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: colors.navy,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 40,
    marginTop: 24,
  },
  closeText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
