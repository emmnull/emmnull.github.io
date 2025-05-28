<script lang="ts">
  import { page } from '$app/state';
  import { locales, localizeHref } from '$lib/i18n/generated/runtime';
  import '@fontsource-variable/eb-garamond';
  import '@fontsource-variable/figtree';
  import '@fontsource-variable/spline-sans-mono';
  import '../app.css';

  let { children } = $props();
</script>

<!-- see https://inlang.com/m/gerre34r/library-inlang-paraglideJs/sveltekit#add-the-paraglidemiddleware-to-srchooksserverts -->
<div style="display:none">
  {#each locales as locale}
    <a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
  {/each}
</div>

<!-- svg filters -->
<svg
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  class="size-0 absolute opacity-0"
>
  <defs>
    <!--
		root grain texture and displacement
		-->
    <filter id="grain">
      <feTurbulence
        result="turb"
        type="turbulence"
        baseFrequency="1"
        numOctaves="1"
        seed="1010"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="turb"
        scale="123"
        xChannelSelector="R"
        yChannelSelector="B"
      />
      <feDisplacementMap
        in2="turb"
        scale="-123"
        xChannelSelector="B"
        yChannelSelector="G"
      />
      <!-- <feTurbulence
        result="noise"
        type="turbulence"
        baseFrequency="0.75"
        seed="808"
      />
      <feBlend in="disp" in2="noise" mode="multiply" /> -->
    </filter>

    <!--
		basic beveled glass
		-->
    <filter id="beveled" patternUnits="userSpaceOnUse">
      <feFlood id="premask" flood-color="white" x="3" y="3" />
      <feOffset in="premask" result="mask" dx="-3" dy="-3" />
      <feFlood id="fill" flood-color="red" x="0" y="0" />
      <feComposite in="fill" in2="mask" operator="out" result="border" />
      <feFlood id="bg" flood-color="black" />
      <feComposite in="border" in2="bg" operator="over" result="comped" />
      <feGaussianBlur stdDeviation="5" in="comped" />
      <feDisplacementMap
        in="SourceGraphic"
        scale="16"
        xChannelSelector="R"
        yChannelSelector="R"
        result="bevel"
      />
      <feGaussianBlur stdDeviation="1.5" result="blur" />
      <feTurbulence result="turb" type="turbulence" baseFrequency="0.75" />
      <feDisplacementMap
        in="blur"
        in2="turb"
        scale="5"
        xChannelSelector="R"
        yChannelSelector="B"
      />
    </filter>

    <!--
		reeded/ribbed glass
		<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1" viewBox="0 0 1 1">
			<linearGradient id="g" x2="0" y2="100%">
    		<stop offset="0%" stop-color="#00f" />
				<stop offset="75%" stop-color="#404" />
				<stop offset="100%" stop-color="#f00" />
  		</linearGradient>
  		<rect fill="url(#g)" width="100%" height="100%" />
		</svg>
		-->
    <filter id="reeded" patternUnits="userSpaceOnUse">
      <feImage
        id="reed"
        width="60"
        height="60"
        href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221%22%20height%3D%221%22%20viewBox%3D%220%200%201%201%22%3E%3ClinearGradient%20id%3D%22gradient%22%20x2%3D%220%22%20y2%3D%22100%25%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2300f%22%20%2F%3E%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%23404%22%20%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23f00%22%20%2F%3E%3C%2FlinearGradient%3E%3Crect%20fill%3D%22url(%23gradient)%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20%2F%3E%3C%2Fsvg%3E"
      />
      <feTile result="reeds" />
      <feGaussianBlur stdDeviation="1.5" result="blur" />
      <feDisplacementMap
        in="SourceGraphic"
        scale="80"
        xChannelSelector="R"
        yChannelSelector="B"
        result="disp"
      />
      <feGaussianBlur stdDeviation="0.5" result="blur" />
      <feTurbulence result="turb" type="turbulence" baseFrequency="0.75" />
      <feDisplacementMap
        in="blur"
        in2="turb"
        scale="5"
        xChannelSelector="R"
        yChannelSelector="B"
      />
    </filter>
  </defs>
</svg>

{@render children()}
