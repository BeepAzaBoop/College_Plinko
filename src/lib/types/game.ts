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
  logo: string;
};

export const colleges: College[] = [
  {
    name: 'Rice University',
    minBudget: 100000,
    prestige: 9,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Rice_Owl_logo.svg/1200px-Rice_Owl_logo.svg.png',
  },
  {
    name: 'Harvard University',
    minBudget: 25000,
    prestige: 10,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_wreath.svg/1200px-Harvard_shield_wreath.svg.png',
  },
  {
    name: 'Princeton University',
    minBudget: 25000,
    prestige: 10,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Princeton_University_shield.svg/1200px-Princeton_University_shield.svg.png',
  },
  {
    name: 'University of Pennsylvania (UPenn)',
    minBudget: 22000,
    prestige: 9,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/University_of_Pennsylvania_shield.svg/1200px-University_of_Pennsylvania_shield.svg.png',
  },
  {
    name: 'Massachusetts Institute of Technology (MIT)',
    minBudget: 25000,
    prestige: 10,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/1200px-MIT_logo.svg.png',
  },
  {
    name: 'University of Chicago (UChicago)',
    minBudget: 22000,
    prestige: 9,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/58/University_of_Chicago_shield.svg/1200px-University_of_Chicago_shield.svg.png',
  },
  {
    name: 'Washington University in St. Louis (WashU)',
    minBudget: 20000,
    prestige: 8,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Washington_University_in_St._Louis_seal.svg/1200px-Washington_University_in_St._Louis_seal.svg.png',
  },
  {
    name: 'University of Texas at Austin',
    minBudget: 15000,
    prestige: 7,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/University_of_Texas_at_Austin_logo.svg/1200px-University_of_Texas_at_Austin_logo.svg.png',
  },
  {
    name: 'Texas A&M University',
    minBudget: 12000,
    prestige: 7,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Texas_A%26M_University_logo.svg/1200px-Texas_A%26M_University_logo.svg.png',
  },
  {
    name: 'Trinity University',
    minBudget: 12000,
    prestige: 7,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Trinity_University_Seal.svg/1200px-Trinity_University_Seal.svg.png',
  },
  {
    name: 'Southwestern University',
    minBudget: 10000,
    prestige: 6,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Southwestern_University_Seal.svg/1200px-Southwestern_University_Seal.svg.png',
  },
  {
    name: 'University of Texas at Dallas (UTD)',
    minBudget: 10000,
    prestige: 6,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/40/University_of_Texas_at_Dallas_logo.svg/1200px-University_of_Texas_at_Dallas_logo.svg.png',
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
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/University_of_Houston_Logo.svg/1200px-University_of_Houston_Logo.svg.png',
  },
  {
    name: 'Austin College',
    minBudget: 9000,
    prestige: 5,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/79/Austin_College_Seal.svg/1200px-Austin_College_Seal.svg.png',
  },
  {
    name: 'University of Dallas',
    minBudget: 8000,
    prestige: 5,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/University_of_Dallas_Seal.svg/1200px-University_of_Dallas_Seal.svg.png',
  },
  {
    name: 'St. Edward’s University',
    minBudget: 8000,
    prestige: 5,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/St._Edward%27s_University_Seal.svg/1200px-St._Edward%27s_University_Seal.svg.png',
  },
  {
    name: 'LeTourneau University',
    minBudget: 8000,
    prestige: 5,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Letourneau_University_Seal.svg/1200px-Letourneau_University_Seal.svg.png',
  },
  {
    name: 'St. Mary’s University',
    minBudget: 7000,
    prestige: 4,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/St._Mary%27s_University_%28Texas%29_Seal.svg/1200px-St._Mary%27s_University_%28Texas%29_Seal.svg.png',
  },
  {
    name: 'University of St. Thomas',
    minBudget: 7000,
    prestige: 4,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/University_of_St._Thomas_Seal.svg/1200px-University_of_St._Thomas_Seal.svg.png',
  },
  {
    name: 'Dallas Baptist University',
    minBudget: 7000,
    prestige: 4,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/66/Dallas_Baptist_University_Seal.svg/1200px-Dallas_Baptist_University_Seal.svg.png',
  },
  {
    name: 'University of North Texas (UNT)',
    minBudget: 7000,
    prestige: 4,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/University_of_North_Texas_logo.svg/1200px-University_of_North_Texas_logo.svg.png',
  },
  {
    name: 'Texas State University',
    minBudget: 6000,
    prestige: 3,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/19/Texas_State_University_logo.svg/1200px-Texas_State_University_logo.svg.png',
  },
  {
    name: 'University of Texas at San Antonio (UTSA)',
    minBudget: 6000,
    prestige: 3,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/University_of_Texas_at_San_Antonio_logo.svg/1200px-University_of_Texas_at_San_Antonio_logo.svg.png',
  },
  {
    name: 'University of Texas Rio Grande Valley (UTRGV)',
    minBudget: 5000,
    prestige: 2,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/University_of_Texas_Rio_Grande_Valley_logo.svg/1200px-University_of_Texas_Rio_Grande_Valley_logo.svg.png',
  },
  {
    name: 'University of Texas at Arlington (UTA)',
    minBudget: 5000,
    prestige: 2,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/University_of_Texas_at_Arlington_logo.svg/1200px-University_of_Texas_at_Arlington_logo.svg.png',
  },
  {
    name: 'University of Texas at Tyler',
    minBudget: 5000,
    prestige: 2,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/90/University_of_Texas_at_Tyler_Seal.svg/1200px-University_of_Texas_at_Tyler_Seal.svg.png',
  },
  {
    name: 'University of Houston–Clear Lake',
    minBudget: 4000,
    prestige: 2,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/UHCL_Seal.svg/1200px-UHCL_Seal.svg.png',
  },
  {
    name: 'West Texas A&M University',
    minBudget: 4000,
    prestige: 2,
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/59/West_Texas_A%26M_University_logo.svg/1200px-West_Texas_A%26M_University_logo.svg.png',
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
