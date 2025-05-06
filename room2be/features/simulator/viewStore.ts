// features/simulator/viewStore.ts
import { create } from 'zustand';

type ViewState = {
  angle: number;
  setAngle: (deg: number) => void;
};

export const useViewStore = create<ViewState>((set) => ({
  angle: 0,
  setAngle: (deg) => set({ angle: deg }),
}));
