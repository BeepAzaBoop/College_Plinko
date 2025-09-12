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
export function countCollegeswithinBudget(budget: number): number {
  return colleges.filter((college) => budget >= college.minBudget).length;
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
  logo: typeof logos['../assets/logo.svg']; // the fallback logo is logo.svg which is only used when there is a placeholder
};


export const colleges: College[] = [
  {
    name: 'Rice University',
    minBudget: 100000,
    prestige: 9,
    logo: getLogo('Rice.svg'),
  },
  {
    name: 'Harvard University',
    minBudget: 25000,
    prestige: 10,
    logo: getLogo('Harvard.svg'),
  },
  {
    name: 'Princeton University',
    minBudget: 25000,
    prestige: 10,
    logo: getLogo('Princeton.svg'),
  },
  {
    name: 'University of Pennsylvania (UPenn)',
    minBudget: 22000,
    prestige: 9,
    logo: getLogo('Upenn.svg'), 
  },
  {
    name: 'Massachusetts Institute of Technology (MIT)',
    minBudget: 25000,
    prestige: 10,
    logo: getLogo('MIT.svg')
  },
  {
    name: 'University of Chicago (UChicago)',
    minBudget: 22000,
    prestige: 9,
    logo: getLogo('UChicago.svg'),
  },
  {
    name: 'Washington University in St. Louis (WashU)',
    minBudget: 20000,
    prestige: 8,
    logo: getLogo('WashU.svg'),
  },
  {
    name: 'University of Texas at Austin',
    minBudget: 15000,
    prestige: 7,
    logo: getLogo('UTAustin.svg'),
  },
  {
    name: 'Texas A&M University',
    minBudget: 12000,
    prestige: 7,
    logo: getLogo('TAM.svg'),
  },
  {
    name: 'Trinity University',
    minBudget: 12000,
    prestige: 7,
    logo: getLogo('Trinity.svg'), 
  },
  {
    name: 'Southwestern University',
    minBudget: 10000,
    prestige: 6,
    logo: getLogo('SouthWestern.svg'),
  },
  {
    name: 'University of Texas at Dallas (UTD)',
    minBudget: 10000,
    prestige: 6,
    logo: getLogo('UTD.svg'), 
  },
  {
    name: 'Texas Tech University',
    minBudget: 9000,
    prestige: 5,
    logo : getLogo('TexasTech.svg'),
  },
  {
    name: 'University of Houston',
    minBudget: 9000,
    prestige: 5,
    logo: getLogo('UofH.svg'),
  },
  {
    name: 'Austin College',
    minBudget: 9000,
    prestige: 5,
    logo: getLogo('AustinCollege.svg'),
  },
  {
    name: 'University of Dallas',
    minBudget: 8000,
    prestige: 5,
    logo: getLogo('UofDallas.svg'), 
  },
  {
    name: 'St. Edward’s University',
    minBudget: 8000,
    prestige: 5,
    logo: getLogo('Edwards.svg'), 
  },
  {
    name: 'LeTourneau University',
    minBudget: 8000,
    prestige: 5,
    logo: getLogo('LeTourneau.svg'),
  },
  {
    name: 'St. Mary’s University',
    minBudget: 7000,
    prestige: 4,
    logo: getLogo('St._Mary%27s_University_%28Texas%29_Seal.svg'),
  },
  {
    name: 'University of St. Thomas',
    minBudget: 7000,
    prestige: 4,
    logo: getLogo('Thomas.svg'),
  },
  {
    name: 'Dallas Baptist University',
    minBudget: 7000,
    prestige: 4,
    logo: getLogo('DBU.svg'),
  },
  {
    name: 'University of North Texas (UNT)',
    minBudget: 7000,
    prestige: 4,
    logo: getLogo('UNT.svg'),
  },
  {
    name: 'Texas State University',
    minBudget: 6000,
    prestige: 3,
    logo: getLogo('TSTATE.svg'),
  },
  {
    name: 'University of Texas at San Antonio (UTSA)',
    minBudget: 6000,
    prestige: 3,
    logo: getLogo('UTSA.svg'),
  },
  {
    name: 'University of Texas Rio Grande Valley (UTRGV)',
    minBudget: 5000,
    prestige: 2,
    logo: getLogo('UTRio.svg'),
  },
  {
    name: 'University of Texas at Arlington (UTA)',
    minBudget: 5000,
    prestige: 2,
    logo: getLogo('UTALogo.svg'),
  },
  {
    name: 'University of Texas at Tyler',
    minBudget: 5000,
    prestige: 2,
    logo: getLogo('UNTyler.svg'),
  },
  {
    name: 'University of Houston–Clear Lake',
    minBudget: 4000,
    prestige: 2,
    logo: getLogo('UofHClear.svg'),
  },
  {
    name: 'West Texas A&M University',
    minBudget: 4000,
    prestige: 2,
    logo: getLogo('WAM.svg'),
  },
  {
    name: 'Community College',
    minBudget: 0,
    prestige: 1,
    logo: 'https://media.istockphoto.com/id/1302140271/vector/square-academic-cap-simple-graduate-cap-silhouette-icon.jpg?s=612x612&w=0&k=20&c=v9DUoWgY1p8lbRPobWcWzG1BPl1Bcgk5IonsJgpWcB4=', // Usually no single logo here; can be left empty or replaced with a generic icon
  },
];


export function getAvailableColleges(budget: number): College[] {
  return colleges.filter((college) => budget + 1500 >= college.minBudget);
}


const collegeLogos = colleges.map(college => college.logo);
const MirroredCollegeLogos = [...collegeLogos].reverse();

export { collegeLogos, MirroredCollegeLogos };

