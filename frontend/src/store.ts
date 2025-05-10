import { create } from 'zustand';

type singleTripState = {
  distance: number;
  updateDistance: (by: number) => void;
  consumption: number;
  updateConsumption: (by: number) => void;
  price: number;
  updatePrice: (by: number) => void;
  split: number;
  updateSplit: (by: number) => void;
  total: number;
  updateTotal: (by: number) => void;
  splitTotal: number;
  updateSplitTotal: (by: number) => void;
};

export const useSingleTripStore = create<singleTripState>()((set) => ({
  distance: 0,
  updateDistance: (by) => set(() => ({ distance: by })),
  consumption: 0,
  updateConsumption: (by) => set(() => ({ consumption: by })),
  price: 0,
  updatePrice: (by) => set(() => ({ price: by })),
  split: 0,
  updateSplit: (by) => set(() => ({ split: by })),
  total: 0,
  updateTotal: (by) => set(() => ({ total: by })),
  splitTotal: 0,
  updateSplitTotal: (by) => set(() => ({ splitTotal: by })),
}));
