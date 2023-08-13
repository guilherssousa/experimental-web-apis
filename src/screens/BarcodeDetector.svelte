<script>
  import Highlight from "svelte-highlight";
  import javascript from "svelte-highlight/languages/javascript";

  import Navbar from "../lib/Navbar.svelte";
  import Callout from "../lib/Callout.svelte";
  import Rectangle from "../lib/Rectangle.svelte";

  import { isURL } from "../utils";

  const available = "BarcodeDetector" in window;
  let image;
  let output = [];
  let rectangles = [];

  function drawRectangle({ boundingBox, format, rawValue }, id) {
    const resized = image.width / image.naturalWidth;
    rectangles = [
      ...rectangles,
      {
        x: boundingBox.x * resized,
        y: boundingBox.y * resized,
        width: boundingBox.width * resized,
        height: boundingBox.height * resized,
        format,
        id,
        rawValue,
      },
    ];
  }

  function changeImage({ target }) {
    const fileReader = new FileReader();
    console.log(target.files);
    const [file] = target.files;
    fileReader.onload = function () {
      if (typeof fileReader.result === "string") {
        rectangles = [];
        image.src = fileReader.result;
      }
    };
    fileReader.readAsDataURL(file);
  }

  async function useMockOutput() {
    const { default: mockOutput } = await import("../data/mock_payload.json");
    output = mockOutput;
    mockOutput.forEach(drawRectangle);
  }

  async function readBarcodes() {
    if (!available) return;

    // @ts-ignore
    const barcodeDetector = new BarcodeDetector({
      formats: [
        "data_matrix",
        "ean_13",
        "ean_8",
        "qr_code",
        "upc_a",
        "upc_e",
        "code_128",
        "code_39",
        "code_93",
        "codabar",
      ],
    });

    const barcodes = await barcodeDetector.detect(image);
    barcodes.forEach(drawRectangle);
    output = barcodes;
  }
</script>

<svelte:head>
  <title>Barcode Detection API - Laboratório de Experimentos</title>
</svelte:head>

<section class="mt-4">
  <Navbar />

  <h1 class="mt-4 font-bold text-2xl">Barcode Detection API</h1>

  {#if !available}
    <Callout classname="mt-2">
      🚨 A API de detecção de código de barras ainda não está disponível no seu
      navegador.
    </Callout>
  {/if}

  <p class="mt-2">
    A API de detecção de código de barras detecta códigos de barras lineares e
    bidimensionais em imagens. Formatos aceitos: EAN-13, EAN-8, QR Code, Aztec,
    Code 128, Code 39, Code 93, Codabar, Data Matrix, ITF, PDF417, UPC-A e
    UPC-E.
  </p>

  <p class="mt-2">
    Se o seu navegador ainda não tiver suporte para a API, um botão "Usar Mock
    Payload" estará disponível, assim você poderá observar o output da detecção
    com uma imagem real.
  </p>

  <p class="mt-2">
    <a
      class="text-cyan-500 font-semibold hover:underline"
      href="https://developer.mozilla.org/en-US/docs/Web/API/BarcodeDetector"
      target="_blank">Documentação no MDN (em inglês)</a
    >
  </p>

  <h2 class="mt-6 font-bold text-xl">Exemplo</h2>
  <hr />

  <div>
    <h3>Input</h3>
    <div class="mt-2">
      <label
        for="changeImage"
        class="rounded-md bg-cyan-500 text-white font-semibold px-2 py-1"
      >
        Trocar Imagem
      </label>
      <input
        id="changeImage"
        type="file"
        class="hidden"
        accept="image/*"
        on:change={changeImage}
      />

      {#if !available}
        <button
          on:click={useMockOutput}
          class="rounded-md bg-cyan-500 text-white font-semibold px-2 py-1"
        >
          Usar Mock Payload
        </button>
      {/if}
    </div>
    <div
      id="image-container"
      class="mt-4 flex items-center justify-center w-full overflow-hidden"
    >
      <div class="relative mx-auto">
        <img
          bind:this={image}
          on:load={readBarcodes}
          on:change={readBarcodes}
          width="200"
          src="/barcode.jpg"
          alt="Imagem de entrada"
          class="w-[200px]"
        />
        {#each rectangles as rectangle (rectangle.rawValue)}
          <Rectangle {...rectangle} />
        {/each}
      </div>
    </div>
    <div class="mt-4">
      <h3>Output</h3>
      <p class="mt-2">Todos os códigos de barras detectados:</p>

      <table class="text-sm mt-4 table-fixed">
        <thead>
          <th>ID</th>
          <th>Link</th>
          <th>Formato</th>
        </thead>

        <tbody>
          {#each output as code, index (code)}
            <tr>
              <td>{index + 1}</td>
              <td>
                {#if isURL(code.rawValue)}
                  <a
                    href={code.rawValue}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-blue-500 hover:underline"
                  >
                    {code.rawValue}
                  </a>
                {:else}
                  {code.rawValue}
                {/if}
              </td>
              <td>{code.format}</td>
            </tr>
          {/each}
        </tbody>
      </table>

      <p class="mt-6">
        Esse é o payload de retorno da função <code
          >decode(&lt;HTMLImageElement&gt;)</code
        >. A função retorna um array de objetos com as seguintes propriedades:
      </p>
      <ul class="list-disc list-inside mt-2">
        <li>
          <code>boundingBox</code>: Um objeto com as propriedades{" "}
          <code>x</code>, <code>y</code>, <code>width</code> e{" "}
          <code>height</code> que representam a posição e o tamanho do código de
          barras na imagem.
        </li>
        <li>
          <code>cornerPoints</code>: Um array com os pontos de canto do código
          de barras.
        </li>
        <li>
          <code>format</code>: O formato do código de barras detectado.
        </li>
        <li>
          <code>rawValue</code>: O valor do código de barras detectado.
        </li>
      </ul>

      <Highlight
        class="mt-6"
        language={javascript}
        code={JSON.stringify(output, null, 1)}
      />
    </div>
  </div>
</section>

<style lang="postcss">
  hr {
    @apply border-neutral-200 my-2;
  }

  h3 {
    @apply text-xl font-bold mt-2;
  }

  td {
    @apply px-2 py-1;
  }
</style>
