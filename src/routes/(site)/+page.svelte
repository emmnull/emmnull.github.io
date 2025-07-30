<script lang="ts">
  import Hero from './hero.svelte';
  import Skills from './skills.svelte';
  import Works from './works.svelte';

  let { data } = $props();

  // const bg = new Persisted('root-bg', bgraw, {
  //   serialize(input) {
  //     return toHtml(input, { space: 'svg' });
  //   },
  //   deserialize(stored) {
  //     return parse(stored) as Root;
  //   },
  // });
</script>

<Hero />
<Skills />
<Works works={data.works} />
<!-- <SvgEditor src={bgraw} class="fixed inset-0 h-full w-full" /> -->
