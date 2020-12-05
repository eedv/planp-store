import {
	readable
} from 'svelte/store'

const store = readable({
	status: 'idle',
	products: []
}, async (set) => {
	set({
		status: 'loading',
		products: []
	})
	const res = await fetch(`/productList.json`);
	const products = await res.json();
	if (res.ok) {
		set({
			status: 'ready',
			products
		})
	} else {
		set({
			status: 'error'
		});
	}
	return () => console.log('no more subscribers');
});



export default store;