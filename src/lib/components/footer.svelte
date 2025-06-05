<script lang="ts">
  function backToTop() {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<footer class="mx-auto max-w-prose print:hidden">
  Footer
  <!-- <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] text-sm">
    <nav class="flex flex-col">
      <a href="https://github.com/emmbm" rel="external">GitHub</a>
    </nav>
    <nav class="flex flex-col">
      <a href="/ui">Design system(?)</a>
    </nav>
    <nav class="flex flex-col">
      <button onclick={backToTop} class="button">
        {m.back_to_top()}
        <ArrowUp />
      </button>
    </nav>
  </div> -->
</footer>
