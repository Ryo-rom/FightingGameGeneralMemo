import { Header } from "@/components/features/header";
import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
