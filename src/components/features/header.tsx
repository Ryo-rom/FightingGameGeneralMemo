import { Icon } from "@/components/common/Icon";
import { useCharacters } from "@/hooks/useCharacters";
import { useSelectedCharacterStore } from "@/hooks/useSelectedCharacterStore";
import { useTheme } from "@/hooks/useTheme";
import { shortenText } from "@/utils/text";

import { Host, Picker } from "@expo/ui";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

export function Header() {
  const theme = useTheme();
  const characters = useCharacters();
  const { selectedChara, setSelectedChara } = useSelectedCharacterStore();
  const onChange = (value: number) => {
    const select = characters.find((chr) => {
      return chr.chid === value;
    });
    if (!select) throw new Error(`Unknown chid: ${value}`);
    setSelectedChara(select);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <Link href="/setting" style={styles.setting}>
        <Icon icon="setting" />
      </Link>
      <Host matchContents={{ vertical: true }} style={{ flex: 5 }}>
        <Picker selectedValue={selectedChara.chid} onValueChange={onChange}>
          {characters.map((c) => (
            <Picker.Item
              key={c.chid}
              label={shortenText(c.name)}
              value={c.chid}
            />
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
