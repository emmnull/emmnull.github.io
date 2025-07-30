<script lang="ts">
  import { PUBLIC_EMAIL } from '$env/static/public';
  import { tags_details } from '$lib/data/meta';
  import { skills } from '$lib/data/profile';
  import { CornerRightDown, Send } from 'lucide-svelte';
  import { on } from 'svelte/events';

  const phrases = [
    'push your projects forward,',
    'get happy clients,',
    'ship sweet experiences,',
    'give me a nice smile,',
  ];

  const longest = phrases.reduce((a, b, i, arr) => {
    return arr[a].length < b.length ? i : a;
  }, 0);

  let copied = $state<ReturnType<typeof setTimeout>>();
</script>

<section
  class="
    pointer-events-auto flex w-full max-w-body flex-col items-start
    justify-center gap-padding self-center rounded-section p-padding pb-0
  "
>
  <h2
    {@attach (node) => {
      function settop() {
        const r1 = node.getBoundingClientRect();
        const r2 = document.documentElement.getBoundingClientRect();
        node.style.setProperty(
          '--offset-y',
          (r1.top - window.innerHeight - r2.top).toFixed(1),
        );
      }
      settop();
      on(window, 'resize', () => settop);
    }}
    style:--n={phrases.length}
    class="
      text-xl leading-(--lead) font-medium
      [--d-y:calc(1em*var(--lead))]
      [--lead:1.25]
      [--scroll-y:max(0,var(--spacing-scroll-y)-var(--offset-y))]
      [--seg:calc(100vh/var(--n))]
      lg:text-2xl
    "
  >
    <p class="relative">
      {#each phrases as phrase, i (i)}
        <span
          style:--i={i}
          data-longest={i === longest || undefined}
          class="
            absolute top-0 left-0 whitespace-nowrap
            [--translate-y:clamp(-1*var(--d-y),-1px*var(--scroll-y)+var(--seg)*(var(--i)+1),clamp(0px,var(--d-y)-1px*var(--scroll-y)+var(--seg)*var(--i),var(--d-y)))]
            data-longest:relative
          "
        >
          {#each phrase.split(/(\W)/) as w, ii (ii)}
            <span
              class="
                relative
                [clip-path:inset(0_0_0_0)]
              "
            >
              <span
                style:--ii={ii}
                data-inline={w === ' ' || undefined}
                class="
                  inline-block translate-y-(--translate-y)
                  transition-[translate] duration-[calc(500ms+100ms*var(--ii))]
                  ease-exp-out will-change-[translate]
                  [--dy:calc(1px*(var(--spacing-scroll-y)-var(--offset-y))-50vh)]
                  data-inline:inline
                "
              >
                {w}
              </span>
            </span>
          {/each}
        </span>
      {/each}
    </p>
    <p>
      hire me to work with
      <CornerRightDown
        class="inline size-[.65em] stroke-3"
        stroke-linecap="butt"
      />
    </p>
  </h2>
  <ul
    class="
      group/skills pointer-events-none flex max-w-prose-body flex-row flex-wrap
      gap-gap font-mono text-sm
    "
  >
    {#each skills as skill, i (skill)}
      {@const details = tags_details[skill]}
      <li class="pointer-events-auto chip" style:--i={i}>
        {details.label}
      </li>
    {/each}
    <li
      class="
        pointer-events-none chip-base animate-pulse border-dashed
        border-current/10 bg-current/5 pattern-lines text-success
        pattern-color-[currentcolor]/10 pattern-angle-[-45deg]
        pattern-spacing-[.5em]
      "
      style:--i={skills.length + 1}
    >
      * your stack *
      <span class="opacity-40">
        i learn fast <span class="inline-block rotate-90">;)</span>
      </span>
    </li>
  </ul>
  <button
    aria-pressed={copied != null || undefined}
    class="button-cta text-sm"
    onpointerdown={() => {
      navigator.clipboard.writeText(PUBLIC_EMAIL);
      clearTimeout(copied);
      copied = setTimeout(() => {
        copied = undefined;
      }, 1500);
    }}
  >
    <Send /> Get in touch
  </button>
</section>
