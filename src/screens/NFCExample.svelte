<script>
    import Callout from "../components/Callout.svelte";

    import Highlight from "svelte-highlight";
    import json from "svelte-highlight/languages/json";
    import "highlight.js/styles/github-dark-dimmed.css";

    const available = "NDEFReader" in window;

    let records = [];

    async function readTag() {
        if (!("NDEFReader" in window)) return;

        const ndef = new NDEFReader();
        try {
            await ndef.scan();
            ndef.onreading = event => {
                alert("Lido com sucesso.")
                records = event;
            }
        } catch(error) {
            alert(error);
        }
    }
</script>

<svelte:head>
  <title>Web NFC API - Laboratório de Experimentos</title>
</svelte:head>

{#if !available}
  <Callout classname="mt-2">
    🚨 A Web NFC API ainda não está disponível no seu
    navegador.
  </Callout>
{/if}

{#if available}
    <button on:click={readTag} class="rounded-md text-base bg-cyan-500 text-white font-semibold px-2 py-1">Clique para ler</button>
{/if}

<Highlight
    class="mt-6"
    language={json}
    code={JSON.stringify(records, null, 1)}
/>