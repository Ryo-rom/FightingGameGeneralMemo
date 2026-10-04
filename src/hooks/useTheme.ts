import { Colors } from "@/styles/Colors";
import { useColorScheme } from "react-native";

export function useTheme() {
  const scheme = useColorScheme();
  return Colors[scheme === "dark" ? "dark" : "light"];
}
