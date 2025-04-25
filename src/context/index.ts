import { create } from "zustand";

// Definisi tipe untuk state sidebar
interface ZustandState {
  expanded: boolean;
  handle?: (
    name: keyof ZustandState,
    value: ZustandState[keyof ZustandState]
  ) => void;
}

// State awal
const initialState: ZustandState = {
  expanded: true,
};

// Membuat store Zustand dengan tipe yang lebih jelas
const createStore = create<ZustandState>((set) => ({
  ...initialState,
  handle: (name, value) =>
    set((state) => ({
      ...state,
      [name]: value,
    })),
}));

export default createStore;
