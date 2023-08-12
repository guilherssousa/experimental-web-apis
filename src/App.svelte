<script>
  import { Router, Route } from "svelte-routing";

  import Home from "./screens/Home.svelte";
</script>

<Router url="/">
  <Route path="/" component={Home} />
</Router>
