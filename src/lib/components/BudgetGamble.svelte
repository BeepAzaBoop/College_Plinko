<script lang="ts">
  import { gameStage, collegeBudget, budgetGambleAmount, balance } from '$lib/stores/game';
  import { setBalanceFromLocalStorage } from '$lib/utils/game';

  // Load balance from localStorage
  $effect(() => {
    setBalanceFromLocalStorage();
  });

  function gambleBudget() {
    if ($budgetGambleAmount > $balance) return;

    // Simple random budget generation (you can make this more complex)
    const minBudget = Math.max(1000, $budgetGambleAmount * 0.5);
    const maxBudget = $budgetGambleAmount * 3;
    const newBudget = Math.floor(Math.random() * (maxBudget - minBudget + 1)) + minBudget;

    // Update stores
    collegeBudget.set(newBudget);
    balance.update((b) => b - $budgetGambleAmount);

    // Move directly to college plinko stage
    gameStage.set('COLLEGE_PLINKO');
  }

  function resetGame() {
    collegeBudget.set(0);
    budgetGambleAmount.set(10);
    gameStage.set('BUDGET_GAMBLE');
  }
</script>

<div class="flex min-h-[400px] flex-col items-center justify-center rounded-lg bg-gray-900 p-8">
  <div class="mb-8 text-center">
    <h1 class="mb-4 text-3xl font-bold text-white">College Fund Gambling</h1>
    <p class="text-lg text-gray-300">Invest your funds to get a college budget!</p>
  </div>

  <div class="w-full max-w-md rounded-lg bg-gray-800 p-6">
    <div class="mb-6">
      <label class="mb-2 block text-sm font-medium text-white">Your Balance</label>
      <div class="text-2xl font-bold text-green-400">${$balance.toLocaleString()}</div>
    </div>

    <div class="mb-6">
      <label class="mb-2 block text-sm font-medium text-white">Gamble Amount</label>
      <input
        type="number"
        bind:value={$budgetGambleAmount}
        min="1"
        max={$balance}
        class="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    <div class="mb-6">
      <p class="text-sm text-gray-300">
        Potential budget range: ${Math.max(1000, $budgetGambleAmount * 0.5).toLocaleString()} - ${(
          $budgetGambleAmount * 3
        ).toLocaleString()}
      </p>
    </div>

    <button
      on:click={gambleBudget}
      disabled={$budgetGambleAmount > $balance || $budgetGambleAmount <= 0}
      class="w-full rounded-md bg-blue-600 px-4 py-3 font-bold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-600"
    >
      Gamble for College Budget
    </button>
  </div>

  {#if $collegeBudget > 0}
    <div class="mt-6 w-full max-w-md rounded-lg bg-green-900 p-4">
      <h3 class="mb-2 font-bold text-green-400">Budget Won!</h3>
      <p class="text-green-300">
        Your college budget: <span class="font-bold">${$collegeBudget.toLocaleString()}</span>
      </p>
      <button
        on:click={() => gameStage.set('COLLEGE_SELECTION')}
        class="mt-3 rounded-md bg-green-600 px-4 py-2 font-bold text-white transition-colors hover:bg-green-700"
      >
        Continue to College Selection
      </button>
    </div>
  {/if}
</div>
