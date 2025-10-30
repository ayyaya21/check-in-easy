<script lang="ts">
	import Navbar from "$lib/components/Navbar/Navbar.svelte";
	import { page } from "$app/stores";

	let { children } = $props();
	import "../app.css";
</script>

{#if $page.url.pathname !== "/"}
	<Navbar />
{/if}

{@render children?.()}
