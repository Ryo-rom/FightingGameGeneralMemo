import { Colors, type ColorKey } from "@/styles/Colors";
import { useColorScheme } from "react-native";

export function useThemeColor(
  colorName: ColorKey,
  overrides?: { light?: string; dark?: string },
) {
  const scheme = useColorScheme();
  const theme: "light" | "dark" = scheme === "dark" ? "dark" : "light";
  return overrides?.[theme] ?? Colors[theme][colorName];
}
