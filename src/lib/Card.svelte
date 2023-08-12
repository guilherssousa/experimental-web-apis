<script>
  export let api;

  const available = api.available ? "✅" : "⛔";
</script>

<div class="text-xl font-bold">{available} {api.name} &rarr;</div>
<p class="mt-1">{api.description}</p>

<style>
  * {
    @apply text-neutral-900;
  }
</style>
