<script lang="ts">
  import * as m from '$messages';
  import { ArrowUp } from 'lucide-svelte';

  function backToTop() {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<footer class="print:hidden max-w-prose mx-auto">
  <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] text-sm">
    <nav class="flex flex-col">
      <a href="https://github.com/emmbm" rel="external">GitHub</a>
    </nav>
    <nav class="flex flex-col">
      <a href="/ui">{m.design_system()}</a>
    </nav>
    <nav class="flex flex-col">
      <button onclick={backToTop} class="button">
        {m.back_to_top()}
        <ArrowUp />
      </button>
    </nav>
  </div>
</footer>
