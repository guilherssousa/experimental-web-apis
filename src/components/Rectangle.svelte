<script>
  export let x, y, width, height, id;

  const style = `left:${x}px; top:${y}px;height:${height}px;width:${width}px;`;
</script>

<div class="absolute border-4 border-green-400" {style}>
  <div class="relative -top-6 text-green-400 font-bold">
    {id + 1}
  </div>
</div>
