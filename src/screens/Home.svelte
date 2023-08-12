<script>
  import { checkAvailable } from "../utils";

  const availableApis = checkAvailable([
    "BarcodeDetector",
    "Sanitizer",
    "ViewTransition",
  ]);
</script>

<main class="bg-white min-h-screen text-neutral-900">
  <div class="mx-auto max-w-screen-lg px-2">
    <div class="mt-8">
      <h1 class="text-4xl font-bold text-center">🧪 Laboratório</h1>
      <p class="text-center mt-2 text-neutral-700">
        Teste exemplos de Web APIs experimentais e novas funcionalidades do
        JavaScript.
      </p>
    </div>

    <div class="mt-8">
      <h2 class="font-bold text-2xl">Experimentos disponíveis</h2>

      <ul>
        {#each Object.entries(availableApis) as [api, available], index (api)}
          <li>
            {#if available}
              <a href="https://pudim.com/">
                {api} ✅
              </a>
            {:else}
              <span>
                {api} ⛔
              </span>
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  </div>
</main>
