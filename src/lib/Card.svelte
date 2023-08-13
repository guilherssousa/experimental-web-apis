<script>
  export let api;

  const available = api.available ? "✅" : "⛔";
</script>

<div class="text-xl font-bold">{available} {api.name} &rarr;</div>
<p class="mt-1">{api.description}</p>

{#if api.tags}
  <div class="flex items-center gap-x-2 mt-2">
    {#each api.tags as tag (tag)}
      <div class="bg-cyan-500 text-white font-semibold px-2 rounded-md">
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
