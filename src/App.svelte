<script>
  import { checkAvailable } from "./utils";

  const availableApis = checkAvailable([
    "BarcodeDetector",
    "Sanitizer",
    "ViewTransition",
  ]);
</script>

<main class="bg-white min-h-screen">
  <div class="mx-auto max-w-screen-lg">
    <div class="mt-8">
      <h1 class="text-4xl font-bold text-center text-cyan-900">
        🧪 Laboratório
      </h1>
      <p class="text-center text-cyan-900">
        Teste exemplos de Web APIs experimentais e novas funcionalidades do
        JavaScript.
      </p>
    </div>
    <div>
      <h2>Experimentos disponíveis</h2>

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
