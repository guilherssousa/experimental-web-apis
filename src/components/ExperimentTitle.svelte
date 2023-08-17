<script>
    export let experimentId;
    const available = experimentId in window || experimentId in window.navigator;
</script>

<!--
    Esse arquivo existe apenas para inferir a disponibilidade
    do experimento em client-side. Infelizmente no Astro,
    não é possível fazer isso em tempo de build, e, mesmo
    usando uma tag <script/> para resolver o problema em client-side,
    o Astro apenas roda o código uma única vez, então
    essa gambiarra acaba sendo uma saída para o problema.
-->

{available ? "✅" : "❌"} <slot />
