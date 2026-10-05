import { Icon } from "@/components/common/Icon";
import { useCharacters } from "@/hooks/useCharacters";
import { useTheme } from "@/hooks/useTheme";

import { Host, Picker } from "@expo/ui";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export function Header() {
  const theme = useTheme();
  const characters = useCharacters();
  const [charaID, setCharaID] = useState(characters[0].chid);

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <Link href="/setting" style={styles.setting}>
        <Icon icon="setting" />
      </Link>
      <Host matchContents={{ vertical: true }} style={{ flex: 5 }}>
        <Picker selectedValue={charaID} onValueChange={setCharaID}>
          {characters.map((c) => (
            <Picker.Item key={c.chid} label={c.name} value={c.chid} />
          ))}
        </Picker>
      </Host>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 2,
    borderRadius: 10,
  },
  setting: {
    flex: 1,
    padding: 2,
  },
});
