<template>
  <div class="app">
    <div class="md-layout">
      <div class="md-layout-item">
        <div class="md-layout" style="margin-top: 20px;">
          <div class="md-layout-item">
            <h1>Bitshares Testnet For Dapp Developers</h1>
          </div>
          <div class="md-layout-item md-size-10">
            <md-field>
              <md-select v-model="$i18n.locale" name="lang" id="lang">
                <md-option value="zh">zh</md-option>
                <md-option value="en">en</md-option>
              </md-select>
            </md-field>
          </div>
        </div>

        <md-tabs class="md-primary">
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
        &copy;2019 <span>Author: ETY001</span>
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
  .copyright {
    margin-top: 20px;
    text-align: center;
  }
</style>
