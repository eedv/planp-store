<script>
export let value = '';
export let className = '';
export let placeholder = '';
</script>

<style>
.text-input {
	display: flex;
	width: 100%;
	border-radius: 13px;
	border: 1px solid lightgray;
}

.text-input input {
	font-size: 1.5rem;
	border: none;
	margin: 0.5rem 1rem;
	flex: 2;
	min-width: 100px;
}
@media only screen and (min-width: 640px) {
	.text-input {
		width: 400px;
	}
}
</style>

<div class="text-input {className}">
	<input bind:value placeholder="{placeholder}" />
</div>
