<script>
  import { page } from '$app/state';
</script>

<div
  class="
    flex h-dvh w-full flex-col items-center justify-center p-padding
    filter-(--pixelate)
  "
>
  <div class="flex max-w-prose-body flex-col items-start gap-gap">
    <span class="text-2xl">🫢</span>
    <h1>
      {page.status}
    </h1>
    <p class="text-sm opacity-60">
      {page.error?.message}
    </p>
  </div>
</div>
