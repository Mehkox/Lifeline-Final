import {
  Modal,
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

// Custom modal, displays details of an emergency tip. Tip is an object with, title and detail, onClose is a function that closes it.
export default function TipDetailModel({ tip, onClose }) {
  return (
    <Modal
    // Modal is visible if tip is not null, animation type is slide, transparent is true, onRequestClose calls onClose function.
      visible={!!tip}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          {tip && (
            <ScrollView contentContainerStyle={styles.content}>
              <View style={styles.iconCircle}>
                <Ionicons name={tip.icon} size={28} color={colors.navy} />
              </View>
              <Text style={styles.title}>{tip.title}</Text>
              <Text style={styles.detail}>{tip.detail}</Text>
              <Pressable style={styles.button} onPress={onClose}>
                <Text style={styles.buttonText}>Got it</Text>
              </Pressable>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(15,33,50,0.45)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: "75%",
  },
  content: { padding: 28, alignItems: "center" },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.cardAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.textDark,
    marginTop: 16,
    textAlign: "center",
  },
  detail: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.textDark,
    marginTop: 12,
  },
  button: {
    backgroundColor: colors.navy,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 48,
    marginTop: 24,
  },
  buttonText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
