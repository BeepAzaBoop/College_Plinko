import type { RowCount } from '$lib/constants/game';
export type { RowCount } from '$lib/constants/game';
const logos = import.meta.glob('../assets/*.svg', { eager: true, import: 'default' }); // import for college assets aka logos
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
function getLogo(filename: string): string {
  const logo = logos[`../assets/${filename}`];
  if (typeof logo === 'string') {
    return logo;
  }
  const fallback = logos['../assets/logo.svg'];
  return typeof fallback === 'string' ? fallback : '';
};

export type College = {
  name: string;
  minBudget: number;
  prestige: number;
  logo: typeof logos['../assets/logo.svg'];
};

export const colleges: College[] = [
  {
    name: 'Rice University',
    minBudget: 100000,
    prestige: 9,
    logo: getLogo('Rice_Owl_logo.svg'), // placeholder
  },
  {
    name: 'Harvard University',
    minBudget: 25000,
    prestige: 10,
    logo: getLogo('Harvard_University_coat_of_arms.svg'),
  },
  {
    name: 'Princeton University',
    minBudget: 25000,
    prestige: 10,
    logo: getLogo('Princeton_seal.svg'),
  },
  {
    name: 'University of Pennsylvania (UPenn)',
    minBudget: 22000,
    prestige: 9,
    logo: getLogo('University_of_Pennsylvania_shield.svg'), // placeholder
  },
  {
    name: 'Massachusetts Institute of Technology (MIT)',
    minBudget: 25000,
    prestige: 10,
    logo: getLogo('MIT_logo.svg'), // placeholder
  },
  {
    name: 'University of Chicago (UChicago)',
    minBudget: 22000,
    prestige: 9,
    logo: getLogo('University_of_Chicago_shield.svg'), // placeholder
  },
  {
    name: 'Washington University in St. Louis (WashU)',
    minBudget: 20000,
    prestige: 8,
    logo: getLogo('Washington_University_in_St._Louis_seal.svg'),
  },
  {
    name: 'University of Texas at Austin',
    minBudget: 15000,
    prestige: 7,
    logo: getLogo('University_of_Texas_at_Austin_logo.svg'), // placeholder
  },
  {
    name: 'Texas A&M University',
    minBudget: 12000,
    prestige: 7,
    logo: getLogo('Texas_A%26M_University_logo.svg'), // placeholder
  },
  {
    name: 'Trinity University',
    minBudget: 12000,
    prestige: 7,
    logo: getLogo('Trinity_University_Seal.svg'), // placeholder
  },
  {
    name: 'Southwestern University',
    minBudget: 10000,
    prestige: 6,
    logo: getLogo('Southwestern_University_Seal.svg'), // placeholder
  },
  {
    name: 'University of Texas at Dallas (UTD)',
    minBudget: 10000,
    prestige: 6,
    logo: getLogo('University_of_Texas_at_Dallas_logo.svg'), // placeholder
  },
  {
    name: 'Texas Tech University',
    minBudget: 9000,
    prestige: 5,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/Texas_Tech_University_logo.svg/1200px-Texas_Tech_University_logo.svg.png',
  },
  {
    name: 'University of Houston',
    minBudget: 9000,
    prestige: 5,
    logo: getLogo('University_of_Houston_seal.svg'), // placeholder
  },
  {
    name: 'Austin College',
    minBudget: 9000,
    prestige: 5,
    logo: getLogo('Austin_College_Seal.svg'), // placeholder
  },
  {
    name: 'University of Dallas',
    minBudget: 8000,
    prestige: 5,
    logo: getLogo('University_of_Dallas_Seal.svg'), // placeholder
  },
  {
    name: 'St. Edward’s University',
    minBudget: 8000,
    prestige: 5,
    logo: getLogo('St._Edward%27s_University_Seal.svg'), // placeholder
  },
  {
    name: 'LeTourneau University',
    minBudget: 8000,
    prestige: 5,
    logo: getLogo('Letourneau_University_Seal.svg'), // placeholder
  },
  {
    name: 'St. Mary’s University',
    minBudget: 7000,
    prestige: 4,
    logo: getLogo('St._Mary%27s_University_%28Texas%29_Seal.svg'), // placeholder
  },
  {
    name: 'University of St. Thomas',
    minBudget: 7000,
    prestige: 4,
    logo: getLogo('University_of_St._Thomas_Seal.svg'), // placeholder
  },
  {
    name: 'Dallas Baptist University',
    minBudget: 7000,
    prestige: 4,
    logo: getLogo('Dallas_Baptist_University_Seal.svg'), // placeholder
  },
  {
    name: 'University of North Texas (UNT)',
    minBudget: 7000,
    prestige: 4,
    logo: getLogo('UNT logo.svg'),
  },
  {
    name: 'Texas State University',
    minBudget: 6000,
    prestige: 3,
    logo: getLogo('Texas State.svg'), // placeholder
  },
  {
    name: 'University of Texas at San Antonio (UTSA)',
    minBudget: 6000,
    prestige: 3,
    logo: getLogo('UTSA logo.svg'),
  },
  {
    name: 'University of Texas Rio Grande Valley (UTRGV)',
    minBudget: 5000,
    prestige: 2,
    logo: getLogo('ut rio grande logo.svg'),
  },
  {
    name: 'University of Texas at Arlington (UTA)',
    minBudget: 5000,
    prestige: 2,
    logo: getLogo('UTA logo.svg'),
  },
  {
    name: 'University of Texas at Tyler',
    minBudget: 5000,
    prestige: 2,
    logo: getLogo('UT Tyler logo.svg'),
  },
  {
    name: 'University of Houston–Clear Lake',
    minBudget: 4000,
    prestige: 2,
    logo: getLogo('University_of_Houston–Clear_Lake_seal.svg'),
  },
  {
    name: 'West Texas A&M University',
    minBudget: 4000,
    prestige: 2,
    logo: getLogo('WestTexasA&M logo.svg'),
  },
  {
    name: 'Community College',
    minBudget: 0,
    prestige: 1,
    logo: 'https://media.istockphoto.com/id/1302140271/vector/square-academic-cap-simple-graduate-cap-silhouette-icon.jpg?s=612x612&w=0&k=20&c=v9DUoWgY1p8lbRPobWcWzG1BPl1Bcgk5IonsJgpWcB4=', // Usually no single logo here; can be left empty or replaced with a generic icon
  },
];


export function getAvailableColleges(budget: number): College[] {
  return colleges.filter((college) => budget >= college.minBudget);
}
