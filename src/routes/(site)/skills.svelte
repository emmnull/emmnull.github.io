<script lang="ts">
  import { PUBLIC_EMAIL } from '$env/static/public';
  import { tags_details } from '$lib/data/meta';
  import { skills } from '$lib/data/profile';
  import { Send } from 'lucide-svelte';

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
  class="mx-gap bg-surface rounded-section flex flex-col items-center justify-center self-stretch"
>
  <div
    class="px-padding gap-padding max-w-body flex w-full flex-col items-start py-[max(var(--spacing-padding),.5*(100vw-var(--spacing-body)))]"
  >
    <h2
      {@attach (node) => {
        node.style.setProperty('--offset', '0');
        const segment = 100 / phrases.length;
        const observers = phrases.map((_, i) => {
          const top = segment * i;
          const bottom = 100 - (top + segment);
          const o = new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) {
                  node.style.setProperty('--offset', String(i));
                }
              }
            },
            { rootMargin: `${-top}% 0% ${-bottom}% 0%`, threshold: 0.1 },
          );
          o.observe(node);
          return o;
        });
        return () => {
          for (const o of observers) {
            o.unobserve(node);
            o.disconnect();
          }
        };
      }}
      class="text-xl leading-(--leading) font-medium [--leading:1.25] [--offset:0] lg:text-2xl"
      style:--l={phrases.length}
    >
      <span class="relative inline-block">
        {#each phrases as phrase, i (i)}
          <span
            style:--i={i}
            data-longest={i === longest || undefined}
            class="absolute top-0 left-0 data-longest:relative"
          >
            {#each phrase.split(/(\W)/) as w, ii (ii)}
              <span class="relative [clip-path:inset(0_0_0_0)]">
                <span
                  style:--ii={ii}
                  data-inline={w === ' ' || undefined}
                  class="ease-exp-out inline-block translate-y-[calc(-1em*var(--leading)*var(--leading)*(var(--l)-1-var(--i)-var(--offset)))] transition-[translate] duration-[calc(1000ms+100ms*var(--ii))] data-inline:inline"
                >
                  {w}
                </span>
              </span>
            {/each}
          </span>
        {/each}
      </span>
      <p>hire me to work with</p>
    </h2>
    <ul
      class="group/skills max-w-prose-body gap-gap pointer-events-none z-1 flex flex-row flex-wrap font-mono text-sm"
    >
      {#each skills as skill, i (skill)}
        {@const details = tags_details[skill]}
        <li class="chip pointer-events-auto" style:--i={i}>
          {details.label}
        </li>
      {/each}
      <li
        class="chip-base text-secondary pattern-lines pattern-spacing-[.5em] pattern-angle-[-45deg] pattern-color-[currentcolor]/10 pointer-events-none animate-pulse bg-current/10"
        style:--i={skills.length + 1}
      >
        * your stack *
        <span class="opacity-50"
          >(i learn fast <span class="inline-block rotate-90">;)</span>)</span
        >
      </li>
    </ul>
    <button
      aria-pressed={copied != null || undefined}
      class="button-cta self-end"
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
  </div>
</section>
