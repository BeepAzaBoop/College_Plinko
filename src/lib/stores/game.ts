import PlinkoEngine from '$lib/components/Plinko/PlinkoEngine';
import { binColor, DEFAULT_BALANCE } from '$lib/constants/game';
import {
  getRiskLevel,
  getAvailableColleges,
  type RiskLevel,
  type BetAmountOfExistingBalls,
  type RowCount,
  type WinRecord,
  type College,
} from '$lib/types';
import { interpolateRgbColors } from '$lib/utils/colors';
import { countValueOccurrences } from '$lib/utils/numbers';
import { derived, writable } from 'svelte/store';

export const plinkoEngine = writable<PlinkoEngine | null>(null);

export const betAmount = writable<number>(1);

export const betAmountOfExistingBalls = writable<BetAmountOfExistingBalls>({});

export const rowCount = writable<RowCount>(16);

// New stores for two-stage college gambling
export const gameStage = writable<'PLINKO_GAMBLE' | 'COLLEGE_PLINKO'>('PLINKO_GAMBLE');
export const collegeBudget = writable<number>(0);
export const availableColleges = writable<College[]>([]);
export const selectedCollege = writable<College | null>(null);
export const collegeGambleAmount = writable<number>(5000); // Fixed $5,000 for college gambling
export const hasDroppedCollegeBall = writable<boolean>(false);

export const winRecords = writable<WinRecord[]>([]);

/**
 * Game balance, which is saved to local storage.
 *
 * We only save the balance to local storage on browser `beforeunload` event instead of
 * on every balance change. This prevents unnecessary writes to local storage, which can
 * be slow on low-end devices.
 */
export const balance = writable<number>(DEFAULT_BALANCE);

/**
 * Risk level for the current game session.
 */
export const riskLevel = writable<RiskLevel>('MEDIUM');

/**
 * History of total profits. Should be updated whenever a new win record is pushed
 * to `winRecords` store.
 *
 * We deliberately don't use `derived(winRecords, ...)` to optimize performance.
 */
export const totalProfitHistory = writable<number[]>([0]);

/**
 * RGB colors for every bin. The length of the array is the number of bins.
 */
export const binColors = derived<typeof rowCount, { background: string[]; shadow: string[] }>(
  rowCount,
  ($rowCount) => {
    const binCount = $rowCount + 1;
    const isBinsEven = binCount % 2 === 0;
    const redToYellowLength = Math.ceil(binCount / 2);

    const redToYellowBg = interpolateRgbColors(
      binColor.background.red,
      binColor.background.yellow,
      redToYellowLength,
    ).map(({ r, g, b }) => `rgb(${r}, ${g}, ${b})`);

    const redToYellowShadow = interpolateRgbColors(
      binColor.shadow.red,
      binColor.shadow.yellow,
      redToYellowLength,
    ).map(({ r, g, b }) => `rgb(${r}, ${g}, ${b})`);

    return {
      background: [...redToYellowBg, ...redToYellowBg.toReversed().slice(isBinsEven ? 0 : 1)],
      shadow: [...redToYellowShadow, ...redToYellowShadow.toReversed().slice(isBinsEven ? 0 : 1)],
    };
  },
);

export const binProbabilities = derived<
  [typeof winRecords, typeof rowCount],
  { [binIndex: number]: number }
>([winRecords, rowCount], ([$winRecords, $rowCount]) => {
  const occurrences = countValueOccurrences($winRecords.map(({ binIndex }) => binIndex));
  const probabilities: Record<number, number> = {};
  for (let i = 0; i < $rowCount + 1; ++i) {
    probabilities[i] = occurrences[i] / $winRecords.length || 0;
  }
  return probabilities;
});

// Derived store to update available colleges when budget changes
export const derivedAvailableColleges = derived(collegeBudget, ($collegeBudget) => {
  return getAvailableColleges($collegeBudget);
});
