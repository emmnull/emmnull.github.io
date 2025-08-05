<script lang="ts">
  import Footer from '$lib/components/footer.svelte';
  import Navbar from '$lib/components/navbar.svelte';

  let { children } = $props();
</script>

<Navbar />
<main
  class="
    flex origin-(--root-center) flex-col bg-base transition ease-exp-out
    perspective-[16vw] perspective-origin-(--root-center)
    [:has(:modal:open,[aria-modal='true']:open)_&]:scale-90
    [:has(:modal:open,[aria-modal='true']:open)_&]:rounded-xl
  "
>
  {@render children()}
  <Footer />
  <!-- <SvgEditor
    src={`<svg
  width="1000"
  height="1000"
  viewBox="0 0 1000 1000"
	preserveAspectRatio="xMidYMid"
  xmlns="http://www.w3.org/2000/svg"
>
  <path stroke-linecap="square" fill="none" stroke-linejoin="round" stroke="green" stroke-width="150" d="M309.471 324.584C309.471 325.757 310.643 328.705 313.299 332.551C315.489 335.723 325.386 335.242 338.095 333.483C343.98 332.669 347.873 328.208 350.28 325.224C354.117 320.466 354.463 312.79 355.058 304.806C355.303 301.52 354.481 299.753 352.42 297.674C342.756 287.926 324.391 289.06 305.679 292.594C302.384 293.784 300.625 294.957 299.719 298.198C298.813 301.44 298.813 306.715 298.813 312.151"/>
  <path stroke-linecap="square" fill="none" stroke-linejoin="round" stroke="green" stroke-width="150" d="M318.92 585.654C321.265 587.466 325.954 587.466 329.249 586.001C332.544 584.535 334.303 581.604 335.208 578.629C336.949 572.913 335.528 567.945 332.882 563.816C331.187 561.171 327.304 558.513 323.734 557.297C320.164 556.08 302 557.297 302 572C302 582.5 306.133 586.613 313 591"/>
  <path stroke-linecap="square" fill="none" stroke-linejoin="round" stroke="green" stroke-width="150" d="M547 135C572.5 156.5 610.983 200 626.744 228.82C653.568 277.873 684.759 330.468 689.392 387.154C694.61 451.005 687.892 543 670 608.5C644.819 700.688 598.5 783 557.5 845"/>
</svg>`}
    class="sticky bottom-0 -z-1 h-dvh w-dvw"
  /> -->
</main>
