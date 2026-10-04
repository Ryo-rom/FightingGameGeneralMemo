import { Icons, type IconKey } from "@/data/constants/icons";
import { useTheme } from "@/hooks/useTheme";
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

type Props = { icon: IconKey; size?: number; color?: string };

export function Icon({ icon, size = 24, color }: Props) {
  const themeColor = useTheme().icon;
  const i = Icons[icon];
  const c = color ?? themeColor;

  switch (i.family) {
    case "MaterialIcons":
      return <MaterialIcons name={i.name} size={size} color={c} />;
    case "MaterialCommunityIcons":
      return <MaterialCommunityIcons name={i.name} size={size} color={c} />;
    case "Ionicons":
      return <Ionicons name={i.name} size={size} color={c} />;
    case "FontAwesome":
      return <FontAwesome name={i.name} size={size} color={c} />;
    case "Feather":
      return <Feather name={i.name} size={size} color={c} />;
  }
}
