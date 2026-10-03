import { Icon } from "@/components/common/Icon";
import { useThemeColor } from "@/hooks/useThemeColor";

import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function Header() {
  return (
    <View style={styles.container}>
      <Link href="/setting" style={styles.setting}>
        <Icon icon="setting" />
      </Link>
      <Pressable style={styles.charaButton}>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          charactor name
        </Text>
        <Icon icon="pullDown" color={useThemeColor("onTint")} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "60%",
    backgroundColor: useThemeColor("card"),
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
    backgroundColor: useThemeColor("tint"),
    borderRadius: 5,
  },
  text: {
    color: useThemeColor("onTint"),
    fontSize: 24,
    flexShrink: 1,
  },
  icon: {
    color: useThemeColor("onTint"),
  },
});
