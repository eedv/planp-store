<script>
export let imageUrl = '';
export let title = '';
export let subTitle = '';
</script>

<style>
.card {
	display: inline-flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
	width: calc(100% - 2rem - 6px);
	border: 3px solid #4d217a82;
	border-radius: 13px;
	padding: 1rem;
	overflow: hidden;
}

.card img {
	object-fit: cover;
	width: 100%;
	height: 300px;
}

@media only screen and (min-width: 480px) {
	.card {
		width: 300px;
		height: 350px;
	}
}
</style>

<div class="card">
	<span>{title}</span>
	<span><strong>{subTitle}</strong></span>
	<img src="{imageUrl}" alt="product" />
</div>
