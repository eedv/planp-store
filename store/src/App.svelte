<script>
import { Router, Route } from 'svelte-routing';
import ProductList from './ProductList';
import ProductDetailScreen from './ProductDetailScreen';
</script>

<style>
:global(body) {
	margin: 0;
	font-family: Arial, Helvetica, sans-serif;
}
.App {
	display: flex;
	justify-content: center;
}
.content {
	margin-top: 3rem;
	width: 85%;
}
</style>

<div class="App">
	<Router>
		<div class="content">
			<Route path="/">
				<ProductList />
			</Route>
			<Route path="/product/:id" let:params>
				<ProductDetailScreen productTitle="{params.id}" />
			</Route>
		</div>
	</Router>
</div>
