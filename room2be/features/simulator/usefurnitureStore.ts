// Zustand store
import { create } from 'zustand';

type Furniture = {
  id: string;
  position: [number, number, number];
};

type State = {
  furniture: Record<string, Furniture>;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  updatePosition: (id: string, pos: [number, number, number]) => void;
};

export const useFurnitureStore = create<State>((set) => ({
  furniture: {},
  selectedId: null,
  setSelectedId: (id) => set({ selectedId: id }),
  updatePosition: (id, pos) =>
    set((state) => ({
      furniture: {
        ...state.furniture,
        [id]: { id, position: pos },
      },
    })),
}));
