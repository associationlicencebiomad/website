<div class="container">
	<div class="form">
		<img src="/images/logo_albm.png" class="logo" alt="Logo" />
		<slot />
	</div>
</div>

<style lang="scss">
	@import 'src/scss/colors';

	.container {
		width: 100vw;
		min-height: 100vh;

		display: flex;
		align-items: center;
		justify-content: center;

		& .logo {
			width: 64px;
			margin-bottom: 8px;
		}

		& :global(.title) {
			margin-bottom: 8px;
			font-size: 24px;
			color: $black-0;
		}

		.form {
			padding: 20px;
			margin: 20px;
			width: 70%;
			max-width: 400px;
			min-width: 200px;
			text-align: center;

			border-radius: 10px;

			background-color: $white-4;
		}
	}
</style>
