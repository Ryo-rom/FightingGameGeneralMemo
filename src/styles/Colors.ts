export const Colors = {
  light: {
    text: "#14181F",
    background: "#F5F7FA",
    card: "#FFFFFF",
    tint: "#2D6CDF",
    onTint: "#FFFFFF",
    icon: "#5A6472",
    border: "#DFE3E8",
  },
  dark: {
    text: "#E8ECF1",
    background: "#0D1117",
    card: "#161B22",
    tint: "#4C8DFF",
    onTint: "#0D1117",
    icon: "#8A93A3",
    border: "#232A34",
  },
};

export type ColorKey = keyof typeof Colors.light;
