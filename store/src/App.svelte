<script>
  import TextInput from './TextInput'
  import Card from './Card'
  let products;
  async function getProducts() {
		const res = await fetch(`productList.json`);
		products = await res.json();

		if (res.ok) {
			return
		} else {
			throw new Error(products);
		}
  }
  getProducts();
  let searchValue = '';
  let result = [];
  $: if (products && products.length > 0) {
    result = searchValue.length > 2
      ? products.filter((p) => p.title.toLowerCase().includes(searchValue.toLowerCase()))
      : products
	}
</script>

<style>
  :global(body) {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
  .App {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }

  .product-list {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		gap: 1rem;
		margin: 1rem 0;
	}
</style>

<div class="App">
  {#await products}
	  <p>...cargando productos</p>
  {:then}
  <TextInput bind:value={searchValue} placeholder="Buscar producto"/>
    <div class="product-list">
      {#each result as product}
        <Card title={product.title} subTitle={product.price} imageUrl={product.listingImage}/>
      {/each}
    </div>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}



</div>
