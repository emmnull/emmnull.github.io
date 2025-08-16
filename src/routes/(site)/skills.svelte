<script lang="ts">
  import { PUBLIC_EMAIL } from '$env/static/public';
  import { tags_details } from '$lib/data/meta';
  import { skills } from '$lib/data/profile';
  import * as m from '$messages';
  import { AtSign, CornerRightDown, Send } from 'lucide-svelte';
  import { on } from 'svelte/events';

  const phrases = m.skills_phrases().split(/(?<=,)/);

  const longest = phrases.reduce((a, b, i, arr) => {
    return arr[a].length < b.length ? i : a;
  }, 0);

  let copied = $state<ReturnType<typeof setTimeout>>();
</script>

<section
  class="
    pointer-events-auto flex w-full max-w-body flex-col items-start
    justify-center gap-padding self-center p-padding
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
      on(window, 'resize', settop);
    }}
    style:--n={phrases.length}
    class="
      text-xl leading-(--lead) font-medium
      [--d-y:calc(1em*var(--lead))]
      [--lead:1.25]
      [--scroll-y:max(0,var(--spacing-scroll-y)-var(--offset-y,0))]
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
      {m.skills_hire_me()}
      <CornerRightDown
        class="inline size-[.65em] stroke-3 whitespace-nowrap"
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
      * {m.skills_your_stack()} *
      <span class="opacity-40">
        {m.skills_your_stack_after()}
        <span class="inline-block rotate-90">;)</span>
      </span>
    </li>
  </ul>
  <button
    aria-pressed={copied != null || undefined}
    class="group flex cursor-pointer items-center gap-[1em] self-end"
    onpointerdown={() => {
      navigator.clipboard.writeText(PUBLIC_EMAIL);
      clearTimeout(copied);
      copied = setTimeout(() => {
        copied = undefined;
      }, 1500);
    }}
  >
    <div class="button-cta">
      <span
        class="
          duration-200 ease-exp-out
          group-hover:hidden
          starting:-translate-y-[1em] starting:opacity-0
        "
      >
        {m.skills_contact()}
      </span>
      <span
        class="
          hidden duration-200 ease-exp-out
          group-hover:inline-block
          starting:translate-y-[1em] starting:opacity-0
        ">{m.skills_copy_email()}</span
      >
    </div>
    <span class="relative filter-(--pixelate)">
      <div
        class="
          relative flex size-[4.5em] animate-coin items-center justify-center
          rounded-full
          [--diffuse:var(--background-color-surface)]
          [--thickness:.5rem]
          transform-3d
          group-hover:text-primary
        "
      >
        <Send class="absolute size-[2em] backface-hidden" />
        <div
          class="
            absolute inset-0 -z-1 rounded-[inherit] bg-(--diffuse) bg-linear-0
            transform-3d
            group-hover:to-current/5
            before:absolute before:top-0 before:left-1/2 before:h-full
            before:w-(--thickness) before:origin-left before:rotate-y-90
            before:bg-(--diffuse) before:bg-linear-0
            group-hover:before:to-current/7
            after:absolute after:inset-0 after:-translate-z-(--thickness)
            after:rounded-[inherit] after:bg-(--diffuse) after:bg-linear-0
            group-hover:after:to-current/5
          "
        ></div>
        <AtSign
          class="
            absolute -z-1 size-[2em] -translate-z-(--thickness) rotate-y-180
            backface-hidden
          "
        />
      </div>
      <div
        class="
          absolute -bottom-[2em] left-1/2 -z-1 aspect-square w-2/3
          -translate-x-1/2 rotate-x-75 rounded-full bg-[black] opacity-20
          blur-[9px]
        "
      ></div>
    </span>
  </button>
</section>
