<script>
  import { Router, Route } from "svelte-routing";

  import Home from "./screens/Home.svelte";
</script>

<main
  class="dark:bg-neutral-900 dark:text-neutral-50 bg-white min-h-screen text-neutral-900 pb-4"
>
  <div class="mx-auto max-w-screen-lg px-2">
    <Router url="/">
      <Route path="/" component={Home} />
    </Router>
  </div>
</main>
