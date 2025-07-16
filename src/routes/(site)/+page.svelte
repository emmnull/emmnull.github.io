<script lang="ts">
  import BgCanvas from './bg-canvas.svelte';
  import Hero from './hero.svelte';
  import Skills from './skills.svelte';
  import Works from './works.svelte';

  let { data } = $props();
</script>

<BgCanvas />
<div
  class="flex flex-col perspective-[16vw] perspective-origin-(--root-center)"
>
  <Hero />
  <Skills />
  <Works works={data.works} />
</div>
