<script>
  import available from "../data/apis.json";
  import { fillAvailable } from "../utils";
</script>

<ul class="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-6">
  {#each fillAvailable(available) as api (api.link)}
    <li>
      <a href={api.link}>
        <h3 class="text-xl dark:text-neutral-200 font-bold text-neutral-900">
          {api.available ? "✅" : "⛔"}
          {api.name} &rarr;
        </h3>
        <p class="mt-1 dark:text-neutral-300 text-neutral-700">
          {api.description}
        </p>

        <div class="flex items-center gap-x-2 mt-2">
          {#if api.tags}
            {#each api.tags as tag (tag)}
              <div
                class="dark:bg-cyan-600 bg-cyan-500 text-white font-semibold px-2 rounded-md"
              >
                {tag}
              </div>
            {/each}
          {/if}
        </div>
      </a>
    </li>
  {/each}
</ul>
