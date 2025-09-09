<script lang="ts">
  import { binColorsByRowCount } from '$lib/constants/game';
  import { plinkoEngine, rowCount, winRecords, derivedAvailableColleges } from '$lib/stores/game';
  import { isAnimationOn } from '$lib/stores/settings';
  import type { Action } from 'svelte/action';
  

  /**
   * Bounce animations for each bin, which is played when a ball falls into the bin.
   */
  let binAnimations: Animation[] = $state([]);

  // NOTE: Not using $effect because it'll play animation if we toggle on animation in settings
  winRecords.subscribe((value) => {
    if (value.length) {
      const lastWinBinIndex = value[value.length - 1].binIndex;
      playAnimation(lastWinBinIndex);
    }
  });

  const initAnimation: Action<HTMLDivElement> = (node) => {
    const bounceAnimation = node.animate(
      [
        { transform: 'translateY(0)' },
        { transform: 'translateY(30%)' },
        { transform: 'translateY(0)' },
      ],
      {
        duration: 300,
        easing: 'cubic-bezier(0.18, 0.89, 0.32, 1.28)',
      },
    );
    bounceAnimation.pause(); // Don't run the animation immediately
    binAnimations.push(bounceAnimation);
  };

  function playAnimation(binIndex: number) {
    if (!$isAnimationOn) {
      return;
    }

    const animation = binAnimations[binIndex];

    // Always reset animation before playing. Safari has a weird behavior where
    // the animation will not play the second time if it's not cancelled.
    animation.cancel();

    animation.play();
  }

  // Get college names for bins based on available colleges
  const collegeNames = $derived(
    $derivedAvailableColleges.length > 0
      ? $derivedAvailableColleges.map((college) => college.name)
      : ['Community College', 'State School', 'University', 'Private College', 'Elite University'],
  );
  const MirroredCollegeNames = $derived(
    $derivedAvailableColleges.length > 0
      ? $derivedAvailableColleges
          .map((college) => college.name)
          .slice()
          .reverse()
      : ['Community College', 'State School', 'University', 'Private College', 'Elite University']
          .slice()
          .reverse(),
  );
  const collegeLogos: string[] = $derived(
    $derivedAvailableColleges.length > 0
      ? $derivedAvailableColleges.map((college) => college.logo as string)
      : [
          /* fallback logo paths here */
        ],
  );
  const mirroredCollegeLogos: string[] = $derived(
    $derivedAvailableColleges.length > 0
      ? $derivedAvailableColleges
          .map((college) => college.logo as string)
          .slice()
          .reverse()
      : [
          /* fallback logo paths here, reversed */
        ],
  );
</script>

<!-- Height clamping in mobile: From 10px at 370px viewport width to 16px at 600px viewport width -->
<div class="flex h-[clamp(10px,0.352px+2.609vw,16px)] w-full justify-center lg:h-7">
  {#if $plinkoEngine}
    <div class="flex gap-[1%]" style:width={`${($plinkoEngine.binsWidthPercentage ?? 0) * 100}%`}>
      {#each Array($rowCount + 1) as _, binIndex}
        <div
          use:initAnimation
          class="flex min-w-0 flex-1 items-center justify-center rounded-xs text-[clamp(6px,2.784px+0.87vw,8px)] font-bold text-gray-950 shadow-[0_2px_var(--shadow-color)] lg:rounded-md lg:text-[clamp(10px,-16.944px+2.632vw,12px)] lg:shadow-[0_3px_var(--shadow-color)]"
          style:background-color={binColorsByRowCount[$rowCount].background[binIndex]}
          style:--shadow-color={binColorsByRowCount[$rowCount].shadow[binIndex]}
        >
          {#if binIndex < collegeLogos.length}
            <img
              src={collegeLogos[binIndex]}
              alt="College Logo"
              class="h-full max-h-full max-w-full object-contain"
            />
          {:else}
            <img
              src={mirroredCollegeLogos[binIndex - collegeLogos.length]}
              alt="College Logo"
              class="h-full max-h-full max-w-full object-contain"
            />
          {/if}
        </div>
      {/each}
    </div>
    <!-- close the div you opened after the if -->
  {/if}
</div>
