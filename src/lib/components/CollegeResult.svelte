<script lang="ts">
  import { selectedCollege, derivedAvailableColleges, winRecords } from '$lib/stores/game';
  import { getRiskLevel } from '$lib/types';

  let showResult = $state(false);
  let resultCollege: any = $state(null);

  // Watch for new win records to show college result
  $effect(() => {
    if ($winRecords.length > 0) {
      const lastWin = $winRecords[$winRecords.length - 1];
      const binIndex = lastWin.binIndex;

      // Get college based on bin index
      if ($derivedAvailableColleges.length > 0 && binIndex < $derivedAvailableColleges.length) {
        resultCollege = $derivedAvailableColleges[binIndex];
        showResult = true;
      }
    }
  });

  function closeResult() {
    showResult = false;
    resultCollege = null;
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

{#if showResult && resultCollege}
  <!-- College Result Modal -->
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="mx-4 w-full max-w-md rounded-lg bg-gray-800 p-8 text-center">
      <div class="mb-6">
        <h2 class="mb-4 text-3xl font-bold text-white">🎓 Congratulations!</h2>
        <div
          class="mb-4 flex flex-col items-center gap-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-6"
        >
          <img
            src={resultCollege.logo || '/src/lib/assets/logo.svg'}
            alt={resultCollege.name}
            class="h-full w-full rounded"
          />
          <!-- THE LINE ABOVE IS FOR LOGOS-->
          <div
            class="mb-2 flex h-16 w-16 items-center justify-center rounded bg-gray-300 text-2xl text-gray-500"
          ></div>
          <h3 class="mb-2 text-2xl font-bold text-white">{resultCollege.name}</h3>
          <p class="text-blue-100">You've been accepted!</p>
        </div>

        <div class="space-y-3 text-left">
          <div class="flex justify-between">
            <span class="text-gray-300">Minimum Budget:</span>
            <span class="font-semibold text-green-400"
              >${resultCollege.minBudget.toLocaleString()}</span
            >
          </div>
          <div class="flex justify-between">
            <span class="text-gray-300">Prestige Level:</span>
            <span class="font-semibold text-yellow-400">{resultCollege.prestige}/10</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-300">Risk Level:</span>
            <span class="font-semibold {getRiskColor(getRiskLevel(resultCollege.minBudget))}">
              {getRiskLevel(resultCollege.minBudget)}
            </span>
          </div>
        </div>
      </div>

      <button
        onclick={closeResult}
        class="w-full rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition-colors hover:bg-blue-700"
      >
        Continue
      </button>
    </div>
  </div>
{/if}
