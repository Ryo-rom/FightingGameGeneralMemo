import { Header } from "@/components/features/header";
import { QuickActions } from "@/components/features/quickActions";
import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, View } from "react-native";

const onEditPress = () => {
  console.log("onPress: Edit.");
};
const onSortPress = () => {
  console.log("onPress: Sort.");
};
const onAddPress = () => {
  console.log("onPress: Add.");
};
const onCheckPress = () => {
  console.log("onPress: Check.");
};

export default function Index() {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header />
      <QuickActions
        onEditPress={onEditPress}
        onSortPress={onSortPress}
        onAddPress={onAddPress}
        onCheckPress={onCheckPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
