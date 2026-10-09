import type { Characters } from "@/data/types";
import { create } from "zustand";

const init: Characters = { chid: -1, name: "" };

type selectedCharacterStore = {
  chara: Characters;
  setChara: (newC: Characters) => void;
};

export const useSCS = create<selectedCharacterStore>((set) => ({
  chara: init,
  setChara: (newC) => set({ chara: newC }),
}));
