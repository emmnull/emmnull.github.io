<!--
	@component
	Singleton to use current root scroll position in CSS (custom properties "--spacing-scroll-*")
	and as readable state.
-->
<script module lang="ts">
  import { browser } from '$app/environment';

  let x = $state(0);
  let y = $state(0);

  export const scroll = {
    get x() {
      return x;
    },
    get y() {
      return y;
    },
  };

  function onscroll() {
    x = document.documentElement.scrollLeft;
    y = document.documentElement.scrollTop;
    document.documentElement.style.setProperty('--spacing-scroll-x', `${x}`);
    document.documentElement.style.setProperty('--spacing-scroll-y', `${y}`);
  }

  browser && onscroll();
</script>

<svelte:window {onscroll} />
