<script>
  export let api;

  const available = api.available ? "✅" : "⛔";
</script>

<div class="text-xl dark:text-neutral-100 font-bold">
  {available}
  {api.name} &rarr;
</div>
<p class="mt-1 dark:text-neutral-300 text-neutral-700">{api.description}</p>

{#if api.tags}
  <div class="flex items-center gap-x-2 mt-2">
    {#each api.tags as tag (tag)}
      <div
        class="dark:bg-cyan-600 bg-cyan-500 text-white font-semibold px-2 rounded-md"
      >
        {tag}
      </div>
    {/each}
  </div>
{/if}

<style>
  * {
    @apply text-neutral-900;
  }
</style>
