import type { RowCount } from '$lib/constants/game';
export type { RowCount } from '$lib/constants/game';

export enum BetMode {
  MANUAL = 'MANUAL',
  AUTO = 'AUTO',
}

/**
 * Game's risk level, which controls the volatility of payout.
 */
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export function getRiskLevel(budget: number): RiskLevel {
  if (budget >= 20000) return 'LOW';
  if (budget >= 10000) return 'MEDIUM';
  return 'HIGH';
}

/**
 * A record of the bet amount associated to every existing ball in the game
 * that is still in motion.
 *
 * When a ball enters a bin, its record is removed.
 */
export type BetAmountOfExistingBalls = {
  [ballId: number]: number;
};

export type WinRecord = {
  /**
   * UUID of the win record.
   */
  id: string;
  /**
   * How much the player has bet.
   */
  betAmount: number;
  /**
   * Number of pin rows at the time of winning.
   */
  rowCount: RowCount;
  /**
   * Zero-based index of which bin the ball fell into (leftmost bin is 0).
   */
  binIndex: number;
  payout: {
    /**
     * Multiplier for the payout (e.g. `0.3`, `1.5`).
     */
    multiplier: number;
    /**
     * Actual payout amount.
     */
    value: number;
  };
  /**
   * Payout value minus the bet amount.
   */
  profit: number;
};

export type College = {
  name: string;
  minBudget: number;
  prestige: number;
};

export const colleges: College[] = [
  { name: 'Rice University', minBudget: 100000, prestige: 9 },
  { name: 'Harvard University', minBudget: 25000, prestige: 10 },
  { name: 'Princeton University', minBudget: 25000, prestige: 10 },
  { name: 'University of Pennsylvania (UPenn)', minBudget: 22000, prestige: 9 },
  { name: 'Massachusetts Institute of Technology (MIT)', minBudget: 25000, prestige: 10 },
  { name: 'University of Chicago (UChicago)', minBudget: 22000, prestige: 9 },
  { name: 'Washington University in St. Louis (WashU)', minBudget: 20000, prestige: 8 },
  { name: 'University of Texas at Austin', minBudget: 15000, prestige: 7 },
  { name: 'Texas A&M University', minBudget: 12000, prestige: 7 },
  { name: 'Trinity University', minBudget: 12000, prestige: 7 },
  { name: 'Southwestern University', minBudget: 10000, prestige: 6 },
  { name: 'University of Texas at Dallas (UTD)', minBudget: 10000, prestige: 6 },
  { name: 'Texas Tech University', minBudget: 9000, prestige: 5 },
  { name: 'University of Houston', minBudget: 9000, prestige: 5 },
  { name: 'Austin College', minBudget: 9000, prestige: 5 },
  { name: 'University of Dallas', minBudget: 8000, prestige: 5 },
  { name: 'St. Edward’s University', minBudget: 8000, prestige: 5 },
  { name: 'LeTourneau University', minBudget: 8000, prestige: 5 },
  { name: 'St. Mary’s University', minBudget: 7000, prestige: 4 },
  { name: 'University of St. Thomas', minBudget: 7000, prestige: 4 },
  { name: 'Dallas Baptist University', minBudget: 7000, prestige: 4 },
  { name: 'University of North Texas (UNT)', minBudget: 7000, prestige: 4 },
  { name: 'Texas State University', minBudget: 6000, prestige: 3 },
  { name: 'University of Texas at San Antonio (UTSA)', minBudget: 6000, prestige: 3 },
  { name: 'University of Texas Rio Grande Valley (UTRGV)', minBudget: 5000, prestige: 2 },
  { name: 'University of Texas at Arlington (UTA)', minBudget: 5000, prestige: 2 },
  { name: 'University of Texas at Tyler', minBudget: 5000, prestige: 2 },
  { name: 'University of Houston–Clear Lake', minBudget: 4000, prestige: 2 },
  { name: 'West Texas A&M University', minBudget: 4000, prestige: 2 },
  { name: 'Community College', minBudget: 0, prestige: 1 },
];

export function getAvailableColleges(budget: number): College[] {
  return colleges.filter((college) => budget >= college.minBudget);
}
