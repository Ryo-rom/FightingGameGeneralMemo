import { useSCS } from "@/data/global-state/selectedCharacterStore";

export function useSelectedCharacterStore() {
  const selectedChara = useSCS((state) => state.chara);
  const setSelectedChara = useSCS((state) => state.setChara);
  return { selectedChara, setSelectedChara };
}
