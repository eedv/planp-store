<script>
	import {Link} from 'svelte-routing';
	import Card from './Card'
	import TextInput from './TextInput'
	import store from './store'
	let status = '';
  	let products = []
  	const unsubscribe = store.subscribe(value => {
    	status = value.status;
    	products = value.products;
	});

	let searchValue = '';
	let result = [];
	$: if (products && products.length > 0) {
		result = searchValue.length > 2
		? products.filter((p) => p.title.toLowerCase().includes(searchValue.toLowerCase()))
		: products
		}
</script>

<style>
	.product-list {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		gap: 1rem;
		margin: 1rem 0;
	}
</style>
{#if status === 'idle' || status === 'loading'}
    <p>...cargando productos</p>
  {:else if status === 'ready'}
<TextInput bind:value={searchValue} placeholder="Buscar producto"/>
<div class="product-list">

	{#each result as product}
      <Link to="/product/{product.title}">
        <Card title={product.title} subTitle={product.price} imageUrl={product.listingImage}/>
      </Link>
    {/each}
</div>
{:else if status === 'error'}
    <p style="color: red">Hubo un error</p>
  {/if}