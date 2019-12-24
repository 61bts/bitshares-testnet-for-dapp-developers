<template>
  <div class="app">
    <div class="md-layout">
      <div class="md-layout-item">
        <h1>Bitshares Testnet For Dapp Developers</h1>

        <div class="md-layout md-alignment-center-center">
          <div class="md-layout-item md-size-10">
            <md-field>
              <label for="movie">Language</label>
              <md-select v-model="$i18n.locale" name="lang" id="lang">
                <md-option value="zh">zh</md-option>
                <md-option value="en">en</md-option>
              </md-select>
            </md-field>
          </div>
        </div>

        <md-tabs class="md-primary" md-alignment="fixed">
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
import Intro from '@/components/Intro';
import Accounts from '@/components/Accounts';

export default {
  name: 'app',
  data() {
    return {
    };
  },
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
