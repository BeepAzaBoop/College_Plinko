import { getRiskLevel, getAvailableColleges } from '$lib/types/game';
import type { RiskLevel } from '$lib/types/game';
import { getBinColors } from '$lib/utils/colors';
import { computeBinProbabilities } from '$lib/utils/numbers';

export const DEFAULT_BALANCE = 5000;

export const LOCAL_STORAGE_KEY = {
  BALANCE: 'plinko_balance',
  SETTINGS: {
    ANIMATION: 'plinko_settings_animation',
  },
} as const;

/**
 * Range of row counts the game supports.
 */
export const rowCountOptions = [8, 9, 10, 11, 12, 13, 14, 15, 16] as const;

/**
 * Number of rows of pins the game supports.
 */
export type RowCount = (typeof rowCountOptions)[number];

/**
 * Interval (in milliseconds) for placing auto bets.
 */
export const autoBetIntervalMs = 250;

/**
 * For each row count, the background and shadow colors of each bin.
 */
export const binColorsByRowCount = rowCountOptions.reduce(
  (acc, rowCount) => {
    acc[rowCount] = getBinColors(rowCount);
    return acc;
  },
  {} as Record<RowCount, ReturnType<typeof getBinColors>>,
);

/**
 * For each row count, what's the probabilities of a ball falling into each bin.
 */
export const binProbabilitiesByRowCount: Record<RowCount, number[]> = rowCountOptions.reduce(
  (acc, rowCount) => {
    acc[rowCount] = computeBinProbabilities(rowCount);
    return acc;
  },
  {} as Record<RowCount, number[]>,
);

/**
 * Multipliers of each bin by row count and risk level.
 */
export const binPayouts: Record<RowCount, Record<RiskLevel, number[]>> = rowCountOptions.reduce(
  (acc, rowCount) => {
    acc[rowCount] = {
      LOW: Array(rowCount + 1).fill(0).map((_, i) => {
        // Low risk: more balanced payouts
        const center = Math.floor(rowCount / 2);
        const distance = Math.abs(i - center);
        const maxDistance = center;
        // Invert so edges have higher multipliers
        return Math.round((Math.max(0.5, 0.5 + (distance / maxDistance) * 2.3)) * 100) / 100;
      }),
      MEDIUM: Array(rowCount + 1).fill(0).map((_, i) => {
        // Medium risk: moderate volatility
        const center = Math.floor(rowCount / 2);
        const distance = Math.abs(i - center);
        const maxDistance = center;
        // Invert so edges have higher multipliers
        return Math.round((Math.max(0.2, 0.2 + (distance / maxDistance) * 4.2)) * 100) / 100;
      }),
      HIGH: Array(rowCount + 1).fill(0).map((_, i) => {
        // High risk: high volatility
        const center = Math.floor(rowCount / 2);
        const distance = Math.abs(i - center);
        const maxDistance = center;
        // Invert so edges have higher multipliers
        return Math.round((Math.max(0.1, 0.1 + (distance / maxDistance) * 6.0)) * 100) / 100;
      }),
    };
    return acc;
  },
  {} as Record<RowCount, Record<RiskLevel, number[]>>,
);

/**
 * Returns the colleges available for the current budget.
 */
export function getBinColleges(budget: number) {
  return getAvailableColleges(budget);
}

export const binColor = {
  background: {
    red: { r: 255, g: 0, b: 63 }, // rgb(255, 0, 63)
    yellow: { r: 255, g: 192, b: 0 }, // rgb(255, 192, 0)
  },
  shadow: {
    red: { r: 166, g: 0, b: 4 }, // rgb(166, 0, 4)
    yellow: { r: 171, g: 121, b: 0 }, // rgb(171, 121, 0)
  },
} as const;
