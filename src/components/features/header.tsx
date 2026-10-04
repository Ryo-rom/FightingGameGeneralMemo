import { Icon } from "@/components/common/Icon";
import { useTheme } from "@/hooks/useTheme";

import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function Header() {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <Link href="/setting" style={styles.setting}>
        <Icon icon="setting" />
      </Link>
      <Pressable style={[styles.charaButton, { backgroundColor: theme.tint }]}>
        <Text
          style={[styles.text, { color: theme.onTint }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          charactor name
        </Text>
        <Icon icon="pullDown" color={theme.onTint} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 8,
  },
  setting: {
    flex: 1,
    padding: 5,
  },
  charaButton: {
    flex: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 24,
    flexShrink: 1,
  },
});
