<script>
	import { onDestroy } from 'svelte'
	import store from './store'
	export let productTitle  = ''
	let product = {};
	let status = '';
	const unsubscribe = store.subscribe(value => {
		status = value.status;
		product = value.products.find((p) => p.title === productTitle)
	});
	onDestroy(unsubscribe)
</script>

<style>
	/* your styles go here */
</style>
{#if status === 'idle' || status === 'loading'}
    <p>...cargando productos</p>
  {:else if status === 'ready'}
<p>{product.title}</p>
<img src="{product.listingImage}" alt=""/>
{:else if status === 'error'}
    <p style="color: red">Hubo un error</p>
  {/if}