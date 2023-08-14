<script>
  export let classname;
</script>

<section
  class={"dark:bg-red-800/30 dark:text-red-200 dark:border-red-900/50 bg-red-200 text-red-900 py-2 px-3 border rounded-md border-red-200 ".concat(
    classname
  )}
>
  <slot />
</section>
