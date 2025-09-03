<script lang="ts">
  import {
    plinkoEngine,
    gameStage,
    collegeBudget,
    selectedCollege,
    derivedAvailableColleges,
    hasDroppedCollegeBall,
    collegeGambleAmount,
  } from '$lib/stores/game';
  import CircleNotch from 'phosphor-svelte/lib/CircleNotch';
  import type { Action } from 'svelte/action';
  import CollegeBinsRow from './CollegeBinsRow.svelte';
  import LastWins from './LastWins.svelte';
  import PlinkoEngine from './PlinkoEngine';
  import CollegeResult from '../CollegeResult.svelte';
  import { resetGame } from '$lib/utils/game';

  const { WIDTH, HEIGHT } = PlinkoEngine;

  // Auto-select a random college from available colleges
  $effect(() => {
    if ($derivedAvailableColleges.length > 0 && !$selectedCollege) {
      const randomIndex = Math.floor(Math.random() * $derivedAvailableColleges.length);
      selectedCollege.set($derivedAvailableColleges[randomIndex]);
    }
  });

  const initPlinko: Action<HTMLCanvasElement> = (node) => {
    $plinkoEngine = new PlinkoEngine(node);
    $plinkoEngine.start();

    return {
      destroy: () => {
        $plinkoEngine?.stop();
      },
    };
  };

  function resetCollegeGame() {
    resetGame();
  }

  function dropBall() {
    if ($plinkoEngine && !$hasDroppedCollegeBall) {
      $plinkoEngine.dropBall();
      hasDroppedCollegeBall.set(true);
    }
  }
</script>

<div class="relative bg-gray-900">
  <!-- Game Stage Header -->
  <div class="border-b border-gray-700 bg-gray-800 p-4">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-white">College Plinko</h2>
        <p class="text-sm text-gray-300">Budget: ${$collegeBudget.toLocaleString()}</p>
        {#if $selectedCollege}
          <p class="text-sm text-blue-400">
            Available Colleges: {$derivedAvailableColleges.length}
          </p>
        {/if}
      </div>
      <button
        onclick={resetCollegeGame}
        class="rounded-md bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700"
      >
        New Game
      </button>
    </div>
  </div>

  <!-- Drop Ball Prompt -->
  <div class="border-b border-blue-700 bg-blue-900/20 p-4 text-center">
    <h3 class="mb-2 text-lg font-semibold text-white">Drop One Ball to Select Your College!</h3>
    <p class="mb-4 text-blue-300">
      Your college budget: <span class="font-bold text-green-400"
        >${$collegeBudget.toLocaleString()}</span
      >
    </p>
    <p class="mb-4 text-blue-300">
      Click the button below to drop a ball and see which college you get!
    </p>
    <button
      onclick={dropBall}
      disabled={$hasDroppedCollegeBall}
      class="rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-600"
    >
      {#if $hasDroppedCollegeBall}
        🎓 Ball Dropped - Waiting for Result
      {:else}
        🎓 Drop Ball for College Selection
      {/if}
    </button>
  </div>

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
    <CollegeBinsRow />
  </div>
  <div class="absolute top-1/2 right-[5%] -translate-y-1/2">
    <LastWins />
  </div>
</div>

<CollegeResult />
