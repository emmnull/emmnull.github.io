<script lang="ts">
  import { tags_details } from '$lib/data/meta';
  import { skills } from '$lib/data/profile';
  import { email } from '$lib/rigs/email.svelte';
  import * as m from '$messages';
  import { AtSign, CopyCheck, Send } from 'lucide-svelte';
  import { on } from 'svelte/events';

  const phrases = m.skills_phrases().split(/(?<=,)/);
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
      text-2xl leading-(--lead) font-medium
      [--lead:1.2]
    "
  >
    <p
      class="
        relative grid text-balance
        [--d-y:calc(1em*var(--lead))]
        [--scroll:max(0,var(--spacing-scroll-y)-var(--offset-y,0))]
        [--seg:calc(100vh/var(--n))]
        before:col-start-1 before:row-start-1 before:content-(--prefix)
      "
      style:--prefix="'{m.skills_phrases_prefix()}'"
    >
      {#each phrases as phrase, i (i)}
        <span
          style:--i={i}
          class="
            col-start-1 row-start-1
            [--translate-y:clamp(-1*var(--d-y),-1px*var(--scroll)+var(--seg)*(var(--i)+1),clamp(0px,var(--d-y)-1px*var(--scroll)+var(--seg)*var(--i),var(--d-y)))]
            before:invisible before:content-(--prefix)
          "
        >
          {#each phrase.split(/([^\w']+)/) as w, ii (ii)}
            <span
              class="
                relative
                [clip-path:inset(0_0_0_0)]
              "
            >
              <span
                style:--ii={ii}
                data-inline={/\s/.test(w) || undefined}
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
      {m.skills_hire_me()}&thinsp;:
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
    aria-pressed={email.copied != null || undefined}
    class="group flex cursor-copy items-center gap-[1em] self-end"
    onpointerdown={email.copy}
  >
    <div class="button-cta">
      <span
        class="
          duration-200 ease-exp-out
          group-hover:hidden
          group-aria-pressed:scale-90 group-aria-pressed:opacity-10
          starting:-translate-y-[1em] starting:opacity-0
        "
      >
        {m.skills_contact()}
      </span>
      <span
        class="
          hidden duration-200 ease-exp-out
          group-hover:inline-block
          group-aria-pressed:scale-90 group-aria-pressed:opacity-20
          starting:translate-y-[1em] starting:opacity-0
        "
      >
        {m.skills_copy_email()}
      </span>
      <CopyCheck
        class="
          absolute hidden transition-discrete duration-300 ease-exp-out
          not-group-aria-pressed:scale-110 not-group-aria-pressed:opacity-0
          group-aria-pressed:inline-block
          starting:scale-80 starting:opacity-0
        "
      />
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
