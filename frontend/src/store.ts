import { create } from 'zustand';

type singleTripState = {
  distance: number;
  updateDistance: (by: number) => void;
  litresPerHundred: number;
  updateLitresPerHundred: (by: number) => void;
  fuelCost: number;
  updateFuelCost: (by: number) => void;
  total: number;
  updateTotal: (by: number) => void;
};

export const useSingleTripStore = create<singleTripState>()((set) => ({
  distance: 0,
  updateDistance: (by) => set(() => ({ distance: by })),
  litresPerHundred: 0,
  updateLitresPerHundred: (by) => set(() => ({ litresPerHundred: by })),
  fuelCost: 0,
  updateFuelCost: (by) => set(() => ({ fuelCost: by })),
  total: 0,
  updateTotal: (by) => set(() => ({ total: by })),
}));
