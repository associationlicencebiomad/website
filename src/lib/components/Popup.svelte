<script>
	import {theme} from "$lib/stores";
</script>

<div class="container">
	<div class="form {$theme}">
		<slot />
	</div>
</div>

<style lang="scss">
  @use 'src/scss/colors';

  .container {
    width: 100vw;
    height: calc(100vh - 70px);
    position: fixed;
    z-index: 100;

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(colors.$black-0, 0.5);

    & :global(.title) {
      margin-bottom: 8px;
      font-size: 24px;
      color: inherit;
    }

    .form {
      padding: 20px;
      margin: 20px;
      width: 90%;
      min-width: 200px;
      text-align: center;

      border-radius: 10px;

      background-color: colors.$white-4;

	  &.dark {
		background-color: colors.$black-0;
      }
    }
  }
</style>