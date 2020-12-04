<script>
  import { Router, Route } from "svelte-routing";
  import ProductList from './ProductList'
  import ProductDetailScreen from './ProductDetailScreen'
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


</style>

<div class="App">
  <Router>

  <Route path="/">
    <ProductList/>
  </Route>
  <Route path="/product/:id" let:params>
    <ProductDetailScreen productTitle={params.id}/>
  </Route>

</Router>
</div>
