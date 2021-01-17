<template>
  <div>
    <p>{{ $t('intro_desp') }}</p>
    <p>{{ $t('intro_desp1') }}</p>
    <p>{{ $t('api_url') }} : <pre>wss://api-testnet-private.61bts.com</pre></p>
    <p>{{ $t('chain_id') }} : <pre>2d20869f3d925cdeb57da14dec65bbc18261f38db0ac2197327fc3414585b0c5</pre></p>
  </div>
</template>

<script>
export default {
  name: 'Intro',
}
</script>

<style scoped>
</style>
