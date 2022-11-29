<script lang="ts">
	export let title: string;
	export let description: string;
</script>

<section class="title">
	<h1>{title}</h1>
	<p>{description}</p>
</section>

<style lang="scss">
  @import 'src/scss/colors';

  .title {
    margin: 3em 3em;

    h1 {
      font-size: 40px;
      font-weight: 600;
      text-align: center;
      color: $black-2;
      margin-bottom: 5px;
    }

    p {
      font-size: 24px;
      font-weight: 400;
      text-align: center;
      color: $black-3;

      max-width: 700px;
      margin: 0 auto;
    }

    @media screen and (max-width: 300px) {
      margin: 2em;

      h1 {
        font-size: 30px;
      }

      p {
        font-size: 18px;
      }
    }
  }
</style>