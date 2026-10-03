import type { WordKey } from "@/data/constants/word";
import { i18n } from "@/data/language/i18n";

export function useTranslation() {
  const t = (key: WordKey) => i18n.t(key);
  return { t, locale: i18n.locale };
}
