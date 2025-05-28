<script lang="ts">
  import { tags_details } from '$lib/data/meta';
  import { skills } from '$lib/data/profile';
  import * as m from '$messages';
</script>

<section>
  <h1 class="text-5xl font-semibold leading-normal">
    {m['home.splash']()}
  </h1>
</section>

<section>
  My tools of the trade are:
  <ul class="flex flex-row gap-io-gap">
    {#each skills as skill}
      <li class="chip">
        {tags_details[skill].label}
      </li>
    {/each}
  </ul>
</section>

<section>
  <!-- get 3-5 latest explorations -->
  <h2 class="text-4xl font-bold">{m.work()}</h2>
  <ul>
    <li>Some screenshots</li>
  </ul>
</section>

<!-- <section>
  Planning to fiddle with:
  <ul class="flex flex-row gap-io-gap">
    {#each want as todo}
      <li class="chip">{tags_details[todo].label}</li>
    {/each}
  </ul>
</section> -->

<section>
  {m['workshop.title_alt']()}
  <!-- get 3-5 latest explorations -->
  <a href="/workshop">workshop</a>
</section>

<section>
  Some photos :)
  <!-- pull from insta? -->
</section>
