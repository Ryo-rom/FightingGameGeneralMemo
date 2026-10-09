function charWidth(ch: string): number {
  const c = ch.codePointAt(0) ?? 0;
  if (c <= 0x7e || (c >= 0xff61 && c <= 0xff9f)) return 1;
  return 1.5;
}

/**
 * Truncate text to maxWidth, appending "..." if needed.
 * @param text
 * @param maxWidth
 */
export function shortenText(text: string, maxWidth = 14): string {
  const chars = [...text];
  const total = chars.reduce((sum, c) => (sum += charWidth(c)), 0);
  if (total <= maxWidth) return text;

  let width = 0;
  let result = "";
  for (const ch of chars) {
    width += charWidth(ch);
    if (width > maxWidth) break;
    result += ch;
  }

  return result + "...";
}
