<script lang="ts">
  import { PUBLIC_EMAIL } from '$env/static/public';
  import { tags_details } from '$lib/data/meta';
  import { skills } from '$lib/data/profile';
  import { Check, Copy, Send } from 'lucide-svelte';

  const phrases = [
    'push your projects forward,',
    'get happy clients,',
    'ship sweet experiences,',
    'give me a nice smile,',
  ];

  const longest = phrases.reduce((a, b, i, arr) => {
    return arr[a].length < b.length ? i : a;
  }, 0);

  let copied = $state<NodeJS.Timeout>();
</script>

<section
  class="mx-gap max-w-body px-padding relative flex w-full flex-col gap-[1em] self-center"
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
    class="pattern-crosses pattern-color-surface pattern-spacing-[1.5rem] pattern-spread-30% py-padding relative bg-[center] text-lg leading-(--leading) font-medium [--leading:1.25] [--offset:0] lg:text-2xl"
    style:--l={phrases.length}
  >
    <span class="relative">
      {#each phrases as phrase, i}
        <span
          style:--i={i}
          data-longest={i === longest || undefined}
          class="absolute top-0 left-0 data-longest:relative"
        >
          {#each phrase.split(/(\W)/) as w, ii}
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
    {#each skills as skill, i}
      {@const details = tags_details[skill]}
      <li
        class="bg-io text-on-io h-io rounded-io px-io-padding pointer-events-auto flex items-center transform-3d"
        style:--i={i}
      >
        {details.label}
      </li>
    {/each}
    <li
      class="text-secondary pattern-lines pattern-spacing-[.5em] pattern-angle-[-45deg] pattern-color-[currentcolor]/10 h-io rounded-io px-io-padding pointer-events-none flex animate-pulse items-center gap-[1em] bg-current/10 whitespace-nowrap after:absolute after:inset-0 after:rounded-[inherit]"
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
    class="hover:text-primary group/button h-io flex cursor-copy items-center gap-[1em] self-end aria-pressed:cursor-default"
    onpointerdown={(e) => {
      navigator.clipboard.writeText(PUBLIC_EMAIL);
      clearTimeout(copied);
      copied = setTimeout(() => {
        copied = undefined;
      }, 1500);
    }}
  >
    <span class="absolute inset-0" aria-hidden="true"></span>
    <span
      class="relative flex items-center justify-center filter-(--pixelate-2)"
    >
      <div
        class="animate-coin *:icon:size-[1.5em] *:icon:stroke-[2] flex aspect-square h-full items-center justify-center"
      >
        <Send
          class="transition-all duration-150 group-[:hover,:focus]/button:opacity-0"
        />
        <Check
          class="absolute scale-50 opacity-0 transition-all duration-150 group-[:hover,:focus]/button:in-aria-pressed:scale-100 group-[:hover,:focus]/button:in-aria-pressed:opacity-100"
        />
        <Copy
          class="absolute scale-50 text-base opacity-0 transition-all duration-150 group-[:hover,:focus]/button:not-in-aria-pressed:scale-100 group-[:hover,:focus]/button:not-in-aria-pressed:opacity-100"
        />
      </div>
    </span>
    <span class="relative">
      <span
        class="text-secondary transition-all duration-100 group-[:hover,:focus]/button:opacity-0"
      >
        Get in touch
      </span>
      <span
        class="absolute left-0 whitespace-nowrap opacity-0 transition-all duration-100 group-[:hover,:focus]/button:opacity-100"
      >
        Copy my email
      </span>
    </span>
  </button>
</section>
