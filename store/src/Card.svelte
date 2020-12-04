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
		width: 100%;
		min-width: 250px;
		border: 3px solid #4D217A82;
		border-radius: 13px;
		padding: 1rem;
		overflow: hidden;
	}

	@media only screen and (min-width:640px) {
		.card {
		width: 300px;
	}

	}
</style>

	<div class="card">
		<span>{title}</span>
		<span><strong>{subTitle}</strong></span>
		<img src={imageUrl} width="250px" height="250px" alt="product"/>
	</div>