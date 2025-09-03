# College Plinko - Two-Stage Gambling Game

A college-themed Plinko gambling game with a unique two-stage gameplay system.

## Game Flow

### Stage 1: Budget Gambling

- Players start with a balance of funds
- They can gamble any amount to win a college budget
- The potential budget range is based on the gamble amount:
  - Minimum: $1,000 or 50% of gamble amount (whichever is higher)
  - Maximum: 300% of gamble amount
- If successful, they move to Stage 2

### Stage 2: College Selection & Plinko

- Players see their won budget and available colleges
- Colleges are filtered based on the budget (higher budget = better colleges)
- Players select a target college
- They play ONE Plinko ball to try to get into their chosen college
- The Plinko bins show college names instead of multipliers
- Success/failure determines if they get into the college

## College System

The game includes a comprehensive list of colleges with:

- **Name**: College name
- **Min Budget**: Minimum budget required to access this college
- **Prestige**: Rating from 1-10 indicating college quality
- **Risk Level**: LOW, MEDIUM, or HIGH based on budget requirements

### College Examples:

- **Elite Universities**: Harvard, MIT, Princeton (Prestige 9-10, Budget $25k+)
- **Top Universities**: Rice, UPenn, UChicago (Prestige 8-9, Budget $20k+)
- **State Universities**: UT Austin, Texas A&M (Prestige 7, Budget $12k+)
- **Community Colleges**: (Prestige 1, Budget $0)

## Technical Implementation

### New Components:

- `BudgetGamble.svelte`: Stage 1 gambling interface
- `CollegeSelection.svelte`: Stage 2 college selection
- `CollegePlinko.svelte`: Modified Plinko for college theme
- `CollegeBinsRow.svelte`: College names in bins instead of multipliers

### Game State Management:

- `gameStage`: Controls current stage (BUDGET_GAMBLE, COLLEGE_SELECTION, COLLEGE_PLINKO)
- `collegeBudget`: The budget won from Stage 1
- `selectedCollege`: The college chosen for Plinko
- `derivedAvailableColleges`: Colleges available based on budget

## How to Play

1. **Start**: Begin with Stage 1 (Budget Gambling)
2. **Gamble**: Choose an amount to gamble for college budget
3. **Win Budget**: Get a random budget within the potential range
4. **Select College**: Choose from available colleges based on your budget
5. **Play Plinko**: Drop ONE ball to try to get into your chosen college
6. **Result**: Success or failure determines college admission

The game emphasizes the relationship between budget and college quality, making it both educational and entertaining!
