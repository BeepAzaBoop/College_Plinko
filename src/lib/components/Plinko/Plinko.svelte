<script lang="ts">
  import {
    plinkoEngine,
    balance,
    gameStage,
    collegeBudget,
    hasDroppedCollegeBall,
    collegeGambleAmount,
  } from '$lib/stores/game';
  import CircleNotch from 'phosphor-svelte/lib/CircleNotch';
  import type { Action } from 'svelte/action';
  import BinsRow from './BinsRow.svelte';
  import LastWins from './LastWins.svelte';
  import PlinkoEngine from './PlinkoEngine';

  const { WIDTH, HEIGHT } = PlinkoEngine;

  // Check if player has enough money to proceed to college selection
  $effect(() => {
    if ($balance >= $collegeGambleAmount) {
      // Player has enough money to gamble for college budget
      // Don't auto-transition - let them continue gambling or choose to proceed
    }
  });

  function proceedToCollegeSelection() {
    // Use current balance as college budget
    collegeBudget.set($balance);
    hasDroppedCollegeBall.set(false);
    gameStage.set('COLLEGE_PLINKO');
  }

  const initPlinko: Action<HTMLCanvasElement> = (node) => {
    $plinkoEngine = new PlinkoEngine(node);
    $plinkoEngine.start();

    return {
      destroy: () => {
        $plinkoEngine?.stop();
      },
    };
  };
</script>

<div class="relative bg-gray-900">
  <!-- College Selection Prompt (when player has enough money) -->
  {#if $balance >= $collegeGambleAmount}
    <div class="border-b border-green-700 bg-green-900/20 p-4 text-center">
      <h3 class="mb-2 text-lg font-semibold text-white">🎓 Ready for College Selection!</h3>
      <p class="mb-4 text-green-300">
        Current balance: <span class="font-bold text-green-400">${$balance.toLocaleString()}</span>
      </p>
      <p class="mb-4 text-green-300">
        This will become your college budget. Continue gambling or proceed to college selection?
      </p>
      <button
        onclick={proceedToCollegeSelection}
        class="rounded-lg bg-green-600 px-6 py-3 font-bold text-white transition-colors hover:bg-green-700"
      >
        🎓 Proceed to College Selection
      </button>
    </div>
  {/if}

  <div class="mx-auto flex h-full flex-col px-4 pb-4" style:max-width={`${WIDTH}px`}>
    <div class="relative w-full" style:aspect-ratio={`${WIDTH} / ${HEIGHT}`}>
      {#if $plinkoEngine === null}
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <CircleNotch class="size-20 animate-spin text-slate-600" weight="bold" />
        </div>
      {/if}

      <canvas use:initPlinko width={WIDTH} height={HEIGHT} class="absolute inset-0 h-full w-full">
      </canvas>
    </div>
    <BinsRow />
  </div>
  <div class="absolute top-1/2 right-[5%] -translate-y-1/2">
    <LastWins />
  </div>
</div>
