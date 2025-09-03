<script lang="ts">
  import { Switch } from 'bits-ui';
  import { twMerge } from 'tailwind-merge';

  type Props = {
    checked?: boolean;
    class?: string;
    disabled?: boolean;
    id?: string;
  };

  let { checked = $bindable(undefined), class: className, ...props }: Props = $props();
</script>

<Switch.Root
  bind:checked
  class={twMerge(
    'h-6 w-11 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-slate-900',
    className,
  )}
  {...props}
>
  <Switch.Thumb
    class="pointer-events-none block size-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
  />
</Switch.Root>
