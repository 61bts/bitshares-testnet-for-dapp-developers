<template>
  <div>
    <form novalidate class="md-layout">
      <md-field class="md-layout-item md-size-100">
        <label>{{ $t('username') }}</label>
        <md-input v-model="username"></md-input>
        <md-button
          class="md-icon-button md-dense md-raised md-primary"
          @click="checkUsername"
        >
          <md-icon>person</md-icon>
        </md-button>
      </md-field>
      <md-field class="md-layout-item md-size-100">
        <label>{{ $t('password') }}</label>
        <md-input v-model="password"></md-input>
        <md-button
          class="md-icon-button md-dense md-raised md-primary"
          @click="generatePassword"
        >
          <md-icon>cached</md-icon>
        </md-button>
      </md-field>
      <div class="md-layout-item md-size-100">
        <md-button
          class="md-dense md-raised md-primary"
        >{{ $t('create') }}</md-button>
        <md-button
          class="md-dense md-raised md-accent"
          @click="reset"
        >{{ $t('reset') }}</md-button>
      </div>
    </form>
    <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showSuccessMsg" md-persistent>
      <span>{{ successMsg }}</span>
    </md-snackbar>
    <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showFailedMsg" md-persistent>
      <span>{{ failedMsg }}</span>
    </md-snackbar>
  </div>
</template>

<script>
import ChainApi from '@/libs/api.js';

export default {
  name: 'Accounts',
  data() {
    return {
      username: null,
      password: null,
      showSuccessMsg: false,
      showFailedMsg: false,
      successMsg: null,
      failedMsg: null,
    };
  },
  methods: {
    generatePassword() {
      this.password = ChainApi.generatePassword();
    },
    reset() {
      this.generatePassword();
      this.username = null;
    },
    checkUsername() {
      if (this.username) {
        ChainApi.checkUsername(this.username).then((account) => {
          if (account === null) {
            this.successMsg = this.$i18n.t('username_can_use');
            this.showSuccessMsg = true;
            return;
          } else {
            this.failedMsg = this.$i18n.t('username_has_used');
            this.showFailedMsg = true;
          }
        });
      }
    },
    createUser() {

    },
  },
  created() {
    console.log('created');
  },
  mounted(){
    this.reset();
  },
}
</script>

<style scoped>
</style>
