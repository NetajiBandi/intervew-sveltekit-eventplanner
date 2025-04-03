<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="navbar mb-8 bg-base-100">
	<div class="container mx-auto">
		<div class="flex flex-1 gap-3">
			<a href="/"><img src="/img/eventplanner.svg" alt="Logo" class="h-8 mr-2" /></a>
			<span class="text-xl">Event Planner</span>
		</div>
		<div class="flex-none">
			<ul class="menu menu-horizontal px-1">
				<li><a href="/">Sign in</a></li>
				<li><a href="/">Sign up</a></li>
			</ul>
		</div>
	</div>
</div>
<div class="container mx-auto w-full max-w-xl">
	{#if children}
		{@render children()}
	{:else}
		<p class="text-center text-gray-500">Loading...</p>
	{/if}
</div>
