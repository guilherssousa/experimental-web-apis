<script>
  import Contributors from "../lib/Contributors.svelte";
  import { checkAvailable } from "../utils";

  const availableApis = checkAvailable([
    "BarcodeDetector",
    "Sanitizer",
    "ViewTransition",
  ]);
</script>

<main class="bg-white min-h-screen text-neutral-900">
  <div class="mx-auto max-w-screen-lg px-2">
    <section class="pt-8 flex flex-col text-xl items-center">
      <div class="text-[64px] leading-[96px]">🧪</div>
      <h1 class="text-4xl mt-4 font-bold">Laboratório de Web APIs</h1>

      <p class="mt-2 text-neutral-700">
        Teste exemplos de Web APIs experimentais e novas funcionalidades do
        JavaScript.
      </p>

      <ul class="mt-2 flex gap-x-4 text-cyan-500 font-bold">
        <li><a href="#apis">APIs</a></li>
        <li><a href="#sobre">Sobre</a></li>
        <li>
          <a href="https://github.com/guilherssousa/experimental-web-apis">
            GitHub
          </a>
        </li>
      </ul>
    </section>

    <section class="mt-8" id="apis">
      <h2>🧪 Experimentos disponíveis</h2>
      <hr />

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
    </section>

    <section class="mt-8" id="sobre">
      <h2>🔎 Sobre</h2>
      <hr />

      <p class="leading-relaxed">
        Esse projeto faz parte da apresentação <strong
          >"APIs experimentais para ficar de olho"</strong
        >. Serve para testar as APIs que foram apresentadas de uma forma rápida
        e prática. Você pode acessar o código fonte disponível no
        <a
          href="https://github.com/guilherssousa/experimental-web-apis"
          target="_blank"
        >
          GitHub</a
        >. Se você quiser saber mais sobre as APIs, pode acessar as
        <a
          href="https://developer.mozilla.org/pt-BR/docs/Web/API"
          target="_blank">listas de Web APIs no MDN</a
        >, que exibem as funcionalidades em desenvolvimento com um ícone.
      </p>

      <p class="mt-2">
        Os desenvolvedores do projeto repositório estão listados aqui:

        <Contributors />
      </p>
    </section>
  </div>
</main>

<style>
  a,
  strong {
    @apply text-cyan-500 font-bold;
  }

  hr {
    @apply border-neutral-200 my-4;
  }

  h2 {
    @apply font-bold text-2xl;
  }
</style>
