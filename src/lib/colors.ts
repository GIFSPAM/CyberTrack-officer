export const CHART_COLORS = [
  "#0a1f44",
  "#8b0000",
  "#1a7a4a",
  "#c47d00",
  "#1565c0",
  "#6a1b9a",
  "#00838f",
  "#d84315",
  "#2e7d32",
  "#283593",
];

export function colorFor(index: number) {
  return CHART_COLORS[index % CHART_COLORS.length];
}
