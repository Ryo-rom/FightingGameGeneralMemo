import { Pressable, StyleSheet, View } from "react-native";
import { Icon } from "../common/Icon";

type Props = {
  onEditPress: () => void;
  onSortPress: () => void;
  onAddPress: () => void;
  onCheckPress: () => void;
};

export function QuickActions({
  onEditPress,
  onSortPress,
  onAddPress,
  onCheckPress,
}: Props) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onEditPress}>
        <Icon icon="wholeEdit" />
      </Pressable>
      <Pressable onPress={onSortPress}>
        <Icon icon="sort" />
      </Pressable>
      <Pressable onPress={onAddPress}>
        <Icon icon="add" />
      </Pressable>
      <Pressable onPress={onCheckPress}>
        <Icon icon="editCheck" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 2,
    borderRadius: 10,
  },
});
