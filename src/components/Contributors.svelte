<script>
  async function getContributors() {
    const request = await fetch(
      "https://api.github.com/repos/guilherssousa/experimental-web-apis/contributors"
    );
    const data = await request.json();

    return data.map((user) => ({
      username: user.login,
      avatar: user.avatar_url,
      url: user.html_url,
    }));
  }
</script>

<ul class="flex mt-4 gap-x-4">
  {#await getContributors()}
    <li>Carregando contribuidores...</li>
  {:then users}
    {#each users as user (user.id)}
      <li>
        <a
          href={"https://github.com/guilherssousa/experimental-web-apis/contributors"}
          class="flex items-center gap-x-2 hover:text-cyan-600"
        >
          <img
            src={user.avatar}
            alt={user.username}
            class="w-12 rounded-full"
          />
          <span>@{user.username}</span>
        </a>
      </li>
    {/each}
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</ul>

<style>
  a {
    @apply text-cyan-500 font-bold;
  }
</style>
