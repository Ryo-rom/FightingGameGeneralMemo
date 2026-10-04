import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, Text } from "react-native";

export default function Setting() {
  const theme = useTheme();
  return (
    <Text
      style={[
        styles.text,
        { color: theme.text, backgroundColor: theme.background },
      ]}
    >
      This is Settings.
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
