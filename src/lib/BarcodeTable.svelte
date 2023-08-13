<script>
  import { isURL } from "../utils";
  export let barcodes = [];
</script>

{#if barcodes.length > 0}
  <p class="mt-2">Todos os códigos de barras detectados:</p>

  <table class="text-sm mt-4 table-fixed">
    <thead>
      <th>ID</th>
      <th>Link</th>
      <th>Formato</th>
    </thead>

    <tbody>
      {#each barcodes as code, index (code)}
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
{/if}
