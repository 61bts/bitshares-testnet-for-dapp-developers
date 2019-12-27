<template>
  <div>
    <h2>{{ $t('account_creator') }}</h2>
    <form novalidate class="md-layout">
      <md-field class="md-layout-item md-size-100">
        <label>{{ $t('username') }}</label>
        <md-input v-model="username"></md-input>
        <md-button
          class="md-icon-button md-raised md-primary md-mini"
          @click="checkUsername"
        >
          <md-icon>person</md-icon>
        </md-button>
      </md-field>
      <md-field class="md-layout-item md-size-100">
        <label>{{ $t('password') }}</label>
        <md-input v-model="password"></md-input>
        <md-button
          class="md-icon-button md-raised md-primary md-mini"
          @click="generatePassword"
        >
          <md-icon>cached</md-icon>
        </md-button>
      </md-field>
      <div class="md-layout-item md-size-100">
        <md-button
          class="md-dense md-raised md-primary"
          @click="createUser"
        >{{ $t('create') }}</md-button>
        <md-button
          class="md-dense md-raised md-accent"
          @click="reset"
        >{{ $t('reset') }}</md-button>
        <md-progress-spinner
          v-if="loading"
          :md-diameter="30"
          :md-stroke="3"
          md-mode="indeterminate">
        </md-progress-spinner>
      </div>
    </form>
    <h2>{{ $t('transfer_to', {'amount': 1000, 'asset': 'TEST'}) }}</h2>
    <form novalidate class="md-layout">
      <md-field class="md-layout-item md-size-100">
        <label>{{ $t('username') }}</label>
        <md-input v-model="transferToUsername"></md-input>
      </md-field>
      <div class="md-layout-item md-size-100">
        <md-button
          class="md-dense md-raised md-primary"
          @click="transfer"
        >{{ $t('transfer') }}</md-button>
        <md-progress-spinner
          v-if="transferLoading"
          :md-diameter="30"
          :md-stroke="3"
          md-mode="indeterminate">
        </md-progress-spinner>
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
import ChainApi from '@/libs/ChainApi';
import ServerApi from '@/libs/ServerApi';

export default {
  name: 'Accounts',
  data() {
    return {
      username: null,
      password: null,
      transferToUsername: null,
      showSuccessMsg: false,
      showFailedMsg: false,
      successMsg: null,
      failedMsg: null,
      loading: false,
      transferLoading: false,
    };
  },
  methods: {
    generatePassword() {
      this.password = ChainApi.generatePassword();
    },
    reset() {
      if (this.loading === true) return;
      this.generatePassword();
      this.username = null;
    },
    checkUsername() {
      if (this.username) {
        this.loading = true;
        ChainApi.checkUsername(this.username).then((account) => {
          if (account === null) {
            this.successMsg = this.$i18n.t('username_can_use');
            this.showSuccessMsg = true;
          } else {
            this.failedMsg = this.$i18n.t('username_has_used');
            this.showFailedMsg = true;
          }
          this.loading = false;
        });
      }
    },
    createUser() {
      if (this.loading === true) return;
      this.loading = true;
      ServerApi.createUser(this.username, this.password).then((result) => {
        if (result.data.status === true) {
          this.successMsg = result.data.msg;
          this.showSuccessMsg = true;
        } else {
          this.failedMsg = result.data.msg;
          this.showFailedMsg = true;
        }
        this.loading = false;
      });
    },
    transfer() {
      if (this.transferToUsername) {
        if (this.transferLoading === true) return;
        this.transferLoading = true;
        ServerApi.botTransfer(this.transferToUsername).then((result) => {
          this.transferLoading = false;
          if (result.data.status === true) {
            this.successMsg = result.data.msg;
            this.showSuccessMsg = true;
          } else {
            this.failedMsg = result.data.msg;
            this.showFailedMsg = true;
          }
        }).catch((err) => {
          this.failedMsg = err.message;
          this.showFailedMsg = true;
          this.transferLoading = false;
        });
      }
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
