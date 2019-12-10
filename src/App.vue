<template>
  <div class="app">
    <div class="md-layout">
      <div class="md-layout-item">
        <h1>Bitshares Testnet For Dapp Developers</h1>
        <md-tabs md-sync-route class="md-primary" md-alignment="fixed">
          <md-tab id="intro" :md-label="$t('intro')">
            <Intro></Intro>
          </md-tab>
          <md-tab id="account-creator" :md-label="$t('account_creator')">
            <Accounts></Accounts>
          </md-tab>
        </md-tabs>
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item copyright">
        &copy; ETY001
      </div>
    </div>
  </div>
</template>

<script>
import Intro from './components/Intro';
import Accounts from './components/Accounts';

export default {
  name: 'app',
  components: {
    Intro,
    Accounts,
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
  .copyright {
    margin-top: 20px;
    text-align: center;
  }
</style>
