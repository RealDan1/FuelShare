export function calculateFuelCost(price: number, consumption: number, distance: number) {
  const litresUsed = (consumption / 100) * distance;
  return litresUsed * price; // output total cost (before split)
}

//maybe split this into a new ts file for SoC??
export function splitFuelCost(total: number, split: number) {
  return total / split;
}

export function round2(x: number) {
  return Math.floor(x * 100) / 100;
}
