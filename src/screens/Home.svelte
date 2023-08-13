<script>
  import { Link } from "svelte-routing";

  import Highlight from "svelte-highlight";
  import javascript from "svelte-highlight/languages/javascript";
  import "highlight.js/styles/stackoverflow-light.css";

  import Card from "../lib/Card.svelte";
  import Contributors from "../lib/Contributors.svelte";

  import apis from "../data/apis.json";
  import { fillAvailable } from "../utils";
  import { onMount } from "svelte";

  let githubStars = 0;

  const availableApis = fillAvailable(apis);

  const code = `if (!("<feature-name>" in window)) {
    // Informe o usuário que a função não está disponível e não execute o código.
    // ...
    return
  }`;

  onMount(async () => {
    const response = await fetch(
      "https://api.github.com/repos/guilherssousa/experimental-web-apis"
    );
    const data = await response.json();

    githubStars = data.stargazers_count;
  });
</script>

<main class="bg-white min-h-screen text-neutral-900 pb-4">
  <div class="mx-auto max-w-screen-lg px-2">
    <section class="pt-8 flex flex-col text-xl items-center">
      <div class="text-center">
        <div class="text-[64px] leading-[96px]">🧪</div>
        <h1 class="text-4xl mt-4 font-bold">Laboratório de Web APIs</h1>

        <p class="mt-2 text-neutral-700">
          Teste exemplos de Web APIs experimentais e novas funcionalidades do
          JavaScript.
        </p>
      </div>

      <ul class="mt-2 flex gap-x-6 text-cyan-500 font-bold">
        <li><a href="#apis">Experimentos</a></li>
        <li><a href="#how-to">Como usar</a></li>
        <li><a href="#sobre">Sobre</a></li>
        <li>
          <a href="https://github.com/guilherssousa/experimental-web-apis">
            GitHub (⭐ {githubStars})
          </a>
        </li>
      </ul>
    </section>

    <section class="mt-8" id="apis">
      <h2>🧪 Experimentos disponíveis</h2>
      <hr />

      <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each availableApis as api (api.id)}
          <li>
            {#if api.available}
              <Link to={api.link}><Card {api} /></Link>
            {:else}
              <Card {api} />{/if}
          </li>
        {/each}
      </ul>
    </section>

    <section class="mt-8" id="how-to">
      <h2>✏ Usando APIs em dessenvolvimento</h2>
      <hr />

      <p>
        Para usar as APIs em desenvolvimento, primeiro você precisa detectar se
        o navegador do usuário já tem suporte a funcionalidade. Existem vários
        métodos para habilitar essas features, como usar <i>flags</i>, ou
        acessar via navegadores de preview como o Chrome Canary.
      </p>

      <p class="mt-2">
        Para verificar se a feature já está disponível para uso no navegador do
        cliente, você pode fazer uma verificação pelo objeto da funcionalidade
        no objeto global <code>window</code>:
      </p>

      <Highlight class="mt-4" language={javascript} {code} />
    </section>

    <section class="mt-8" id="sobre">
      <h2>🔎 Sobre</h2>
      <hr />

      <p>
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
        A Stack usada no desenvolvimento do site foi Vite, Svelte, Tailwind e
        Highlight.js.
      </p>

      <p class="mt-2">Os contribuidores do repositório estão listados aqui:</p>

      <Contributors />
    </section>
  </div>
</main>

<style>
  a[target="_blank"],
  strong {
    @apply text-cyan-500 font-bold;
  }

  hr {
    @apply border-neutral-200 my-4;
  }

  h2 {
    @apply font-bold text-2xl;
  }

  p {
    @apply leading-relaxed;
  }
</style>
