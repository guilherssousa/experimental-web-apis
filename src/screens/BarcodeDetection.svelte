<script>
  import Highlight from "svelte-highlight";
  import javascript from "svelte-highlight/languages/json";
  import "highlight.js/styles/github-dark-dimmed.css";

  import Callout from "../components/Callout.svelte";
  import BarcodeTable from "../components/BarcodeTable.svelte";
  import Rectangle from "../components/Rectangle.svelte";

  const available = "BarcodeDetector" in window;
  let output = [];
  let rectangles = [];
  let image;

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

{#if !available}
  <Callout classname="mt-2">
    🚨 A API de detecção de código de barras ainda não está disponível no seu
    navegador.
  </Callout>
{/if}

<div>
  <h3 class="text-xl font-bold mt-2" id="input">Input</h3>

  <div class="mt-2 flex gap-x-2">
    <label
      for="changeImage"
      class="block w-fit rounded-md text-base bg-cyan-500 text-white font-semibold px-2 py-1 cursor-pointer"
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
        class="rounded-md text-base bg-cyan-500 text-white font-semibold px-2 py-1"
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
    <h3 class="text-xl font-bold mt-2" id="output">Output</h3>

    <BarcodeTable barcodes={output} />

    <p class="mt-6">
      Esse é o payload de retorno da função <code
        >decode(&lt;HTMLImageElement&gt;)</code
      >. A função retorna um array de objetos com as seguintes propriedades:
    </p>
    <ul class="list-disc list-inside mt-2">
      <li>
        <code>boundingBox</code>: Um objeto com as propriedades{" "}
        <code>x</code>, <code>y</code>, <code>width</code> e{" "}
        <code>height</code> que representam a posição e o tamanho do código de barras
        na imagem.
      </li>
      <li>
        <code>cornerPoints</code>: Um array com os pontos de canto do código de
        barras.
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
