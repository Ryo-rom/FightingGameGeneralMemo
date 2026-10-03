import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, Text } from "react-native";

export default function Setting() {
  return <Text style={styles.text}>This is Settings.</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: useThemeColor("text"),
    backgroundColor: useThemeColor("background"),
    fontSize: 20,
  },
});
