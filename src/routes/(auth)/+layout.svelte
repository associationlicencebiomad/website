<script>
	import {theme} from "$lib/stores";
</script>

<div class={`container ${$theme}`}>
	<div class="form">
		<img alt="Logo" class="logo" src="/images/logo_albm.png"/>
		<slot/>
	</div>
</div>

<style lang="scss">
  @use 'src/scss/colors';

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
      padding-bottom: 12px;
    }

    .form {
      padding: 20px;
      margin: 20px;
      width: 70%;
      max-width: 400px;
      min-width: 200px;
      text-align: center;

      border-radius: 10px;

      background-color: colors.$white-4;
    }

    &.dark {
      .form {
        background-color: colors.$black-1;

      }
    }
  }
</style>
