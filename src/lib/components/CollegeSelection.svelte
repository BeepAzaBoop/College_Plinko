<script lang="ts">
  import {
    collegeBudget,
    derivedAvailableColleges,
    selectedCollege,
    gameStage,
  } from '$lib/stores/game';
  import { getRiskLevel } from '$lib/types';

  $: {
    // Auto-select the best college available if none selected
    if (!$selectedCollege && $derivedAvailableColleges.length > 0) {
      const bestCollege = $derivedAvailableColleges.reduce((best, current) =>
        current.prestige > best.prestige ? current : best,
      );
      selectedCollege.set(bestCollege);
    }
  }

  function startPlinko() {
    if (!$selectedCollege) return;
    gameStage.set('COLLEGE_PLINKO');
  }

  function goBack() {
    selectedCollege.set(null);
    gameStage.set('BUDGET_GAMBLE');
  }

  function getRiskColor(riskLevel: string) {
    switch (riskLevel) {
      case 'LOW':
        return 'text-green-400';
      case 'MEDIUM':
        return 'text-yellow-400';
      case 'HIGH':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  }
</script>

<div class="flex min-h-[400px] flex-col items-center justify-center rounded-lg bg-gray-900 p-8">
  <div class="mb-8 text-center">
    <h1 class="mb-4 text-3xl font-bold text-white">Select Your College</h1>
    <p class="text-lg text-gray-300">
      Your budget: <span class="font-bold text-green-400">${$collegeBudget.toLocaleString()}</span>
    </p>
  </div>

  <div class="w-full max-w-2xl">
    <div class="mb-6">
      <h3 class="mb-3 text-lg font-semibold text-white">
        Available Colleges ({$derivedAvailableColleges.length})
      </h3>
      <div class="grid max-h-64 gap-3 overflow-y-auto">
        {#each $derivedAvailableColleges as college}
          <div
            class="cursor-pointer rounded-lg border-2 p-4 transition-all {$selectedCollege?.name ===
            college.name
              ? 'border-blue-500 bg-blue-900/20'
              : 'border-gray-600 bg-gray-800 hover:border-gray-500'}"
            on:click={() => selectedCollege.set(college)}
          >
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-semibold text-white">{college.name}</h4>
                <p class="text-sm text-gray-400">
                  Min Budget: ${college.minBudget.toLocaleString()}
                </p>
              </div>
              <div class="text-right">
                <div class="font-bold text-yellow-400">Prestige: {college.prestige}/10</div>
                <div class="text-sm {getRiskColor(getRiskLevel(college.minBudget))}">
                  {getRiskLevel(college.minBudget)} Risk
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="flex justify-center gap-4">
      <button
        on:click={goBack}
        class="rounded-md bg-gray-600 px-6 py-3 font-bold text-white transition-colors hover:bg-gray-700"
      >
        Back to Budget Gambling
      </button>

      <button
        on:click={startPlinko}
        disabled={!$selectedCollege}
        class="rounded-md bg-blue-600 px-6 py-3 font-bold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-600"
      >
        Start Plinko for {$selectedCollege?.name || 'College'}
      </button>
    </div>
  </div>
</div>
