<script lang="ts">
  import Navbar from "$lib/components/Navbar/Navbar.svelte";
  import { page } from "$app/stores";

  let { children } = $props();
  import "../app.css";
</script>

{#if $page.url.pathname !== "/"}
  <Navbar />
{/if}

<main class="min-h-screen bg-gray-100">
  {@render children?.()}
</main>
