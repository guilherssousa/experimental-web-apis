<script>
  import { checkAvailable } from "./utils";

  const availableApis = checkAvailable(["BarcodeDetector", "Sanitizer"]);
  console.log(availableApis);
</script>

<main class="bg-white min-h-screen">
  <div class="mx-auto max-w-screen-lg">
    <h1 class="text-4xl font-bold text-center text-cyan-900">
      Svelte + TailwindCSS
    </h1>
    <p class="text-center text-cyan-900">
      This is a template for Svelte + TailwindCSS
    </p>
  </div>
</main>
