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
  .product-card {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    min-width: 250px;
    border: 3px solid #4D217A82;
    border-radius: 13px;
    padding: 1rem;
    overflow: hidden;
  }
  .search-input {
    display: flex;
    width: 100%;
    border-radius:13px;
    border: 1px solid lightgray;
  }

  .search-input input {
    font-size: 1.5rem;
    border: none;
    margin: 0.5rem 1rem;
    flex: 2;
    min-width: 100px;
  }

  @media only screen and (min-width:640px) {
    .product-card {
      width: 300px;
    }

    .search-input {
      width: 400px;
    }
  }
</style>

<div class="App">
  {#await products}
	<p>...waiting</p>
  {:then}
  <div class="search-input">
    <input  bind:value={searchValue} placeholder="Buscar producto">
  </div>
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
