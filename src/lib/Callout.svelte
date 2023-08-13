<script>
  export let classname;
</script>

<section
  class={"bg-red-100 text-red-900 py-2 px-3 border rounded-md border-red-200 ".concat(
    classname
  )}
>
  <slot />
</section>
