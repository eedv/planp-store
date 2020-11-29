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

  .App-header {
    background-color: #f9f6f6;
    color: #333;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
  }
  @keyframes App-logo-spin {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.06);
    }
  }
</style>

<div class="App">
  <header class="App-header">
  {#await products}
	<p>...waiting</p>
  {:then}
    <input bind:value={searchValue} placeholder="enter your name">

    <ul>
      {#each result as product}
        <li>{product.title} - {product.price} <img src={product.listingImage} width="100px" height="100px" alt="product"/></li>
      {/each}
    </ul>

  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}


  </header>
</div>
