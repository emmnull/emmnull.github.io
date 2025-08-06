<script>
  import { page } from '$app/state';
</script>

<div class="flex h-dvh w-full flex-col items-center justify-center p-padding">
  <div class="flex max-w-prose-body items-start gap-[2rem]">
    <span class="text-2xl filter-(--pixelate)">🫢</span>
    <hr
      class="
        my-[2rem] h-auto self-stretch border-r border-dotted border-current/10
      "
    />
    <div>
      <h1 class="font-mono text-2xl font-bold">
        {page.status}
      </h1>
      <p class="text-sm opacity-60">
        {page.error?.message}
      </p>
    </div>
  </div>
</div>
