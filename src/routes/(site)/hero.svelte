<script lang="ts">
  import { links } from '$lib/data/profile';
  import * as m from '$messages';

  const phrases = m.hero_phrases().split(/(?<=,)/);

  const longest = phrases.reduce((a, b, i, arr) => {
    return arr[a].length < b.length ? i : a;
  }, 0);
</script>

<section
  style:--n={phrases.length}
  class="
    w-full max-w-body self-center text-3xl leading-(--leading) font-medium
    transition duration-750 ease-exp-out
    [--leading:1.2]
    perspective-[200px]
    after:block after:h-[calc(1em*var(--leading)*(var(--n)-1))]
    starting:opacity-0
  "
>
  <h1
    class="
      pointer-events-auto sticky top-0 flex min-h-lvh origin-top flex-col
      justify-center p-padding duration-500 ease-exp-out
      starting:-rotate-x-1
    "
  >
    <span>
      <span class="inline-flex items-center text-[.75em] filter-(--pixelate)">
        👋
      </span>
      allô allô.<br />
      {m.hero_iam()}
      <a
        href={links.github.href}
        class="
          group relative -mx-(--padding) inline-flex items-center gap-[.2em]
          rounded-lg px-(--padding) text-primary transition-colors duration-200
          [--padding:.2em]
          hover:bg-secondary/10 hover:text-secondary
        "
      >
        <span class="group-hover:filter-(--pixelate)">emmanuel</span>
        <span class="relative filter-(--pixelate)">
          <div
            class="
              relative inline-block size-[.85em] animate-coin rounded-full
              [--diffuse:#d4d2ba]
              [--thickness:.1em]
              transform-3d
              group-hover:[animation-play-state:paused,running]
            "
          >
            <img
              class="inset-0 rounded-[inherit] backface-hidden"
              src="{links.github.href}.png?size=248"
              alt="Avatar of Emmanuel's GitHub profile"
              width="248px"
              height="248px"
            />
            <div
              class="
                absolute inset-0 -z-1 rounded-[inherit] bg-(--diffuse)
                transform-3d
                before:absolute before:top-0 before:left-1/2 before:h-full
                before:w-(--thickness) before:origin-left before:rotate-y-90
                before:bg-(--diffuse)
                after:absolute after:inset-0 after:-translate-z-(--thickness)
                after:rounded-[inherit] after:bg-(--diffuse)
              "
            ></div>
            <img
              class="
                absolute inset-0 -z-1 -translate-z-(--thickness) rotate-y-180
                rounded-[inherit] backface-hidden
              "
              src="{links.github.href}.png?size=248"
              alt="Avatar of Emmanuel's GitHub profile"
              width="248px"
              height="248px"
            />
          </div>
          <div
            class="
              absolute -bottom-[.2em] left-1/2 -z-1 aspect-square w-2/3
              -translate-x-1/2 rotate-x-75 rounded-full bg-[black] opacity-20
              blur-[9px]
            "
          ></div>
        </span>
      </a>
      <p
        class="
          relative
          [--scroll:max(-1px*var(--spacing-scroll-y),-1em*(var(--n)-1)*var(--leading))]
          before:[content:var(--before)]
        "
        style:--before="'{m.hero_and_i()} '"
      >
        {#each phrases as phrase, i (i)}
          <span
            style:--i={i}
            data-longest={i === longest || undefined}
            class="
              absolute top-0 left-0
              [--translate-y:calc(var(--scroll)+1em*var(--leading)*var(--i))]
              before:invisible
              not-data-longest:before:[content:var(--before)]
              data-longest:relative
            "
          >
            {#each phrase.split(/(\s+)/) as w, ii (ii)}
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
                    transition-[translate]
                    duration-[calc(500ms+100ms*var(--ii))] ease-exp-out
                    will-change-[translate]
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
    </span>
  </h1>
</section>
