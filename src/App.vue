<template>
  <div class="md-layout app">
    <div class="md-layout-item">
      <h1>Bitshares Testnet For Dapp Developers</h1>
      <md-tabs class="md-primary" md-alignment="centered">
        <md-tab id="intro" :md-label="$t('intro')">
          <Intro></Intro>
        </md-tab>
        <md-tab id="accounts" md-label="创建账号"></md-tab>
      </md-tabs>
    </div>
  </div>
</template>

<script>
import Intro from './components/Intro';

export default {
  name: 'app',
  components: {
    Intro,
  },
}
</script>

<style scoped>
  .app {
    margin: 0 auto;
    width: 80%;
  }
  h1 {
    text-align: center;
  }
</style>
