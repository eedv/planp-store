<script>
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
  $: if (searchValue && searchValue.length > 2 && products && products.length > 0) {
		result = products.filter((p) => p.title.toLowerCase().includes(searchValue.toLowerCase()))
	}
</script>

<style>
  :global(body) {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
  .App {
    text-align: center;
  }
  .App p {
    margin: 0.4rem;
  }

  .product-list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    text-align: center;
  }
  .product-card {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    width: 300px;
    min-width: 250px;
    border: 3px solid #4D217A82;
    border-radius: 13px;
    margin: 1rem;
    padding: 1rem;
    overflow: hidden;
  }
</style>

<div class="App">
  {#await products}
	<p>...waiting</p>
  {:then}
    <input bind:value={searchValue} placeholder="Buscar producto">
    <div class="product-list">
      {#each result as product}
        <div class="product-card">
          <span>{product.title}</span>
          <span><strong>{product.price}</strong></span>
          <img src={product.listingImage} width="250px" height="250px" alt="product"/>
        </div>
      {/each}
    </div>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}



</div>
