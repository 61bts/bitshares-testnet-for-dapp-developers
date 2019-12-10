<template>
  <div>
    <form novalidate class="md-layout">
      <md-field class="md-layout-item md-size-100">
        <label>{{ $t('username') }}</label>
        <md-input v-model="username"></md-input>
      </md-field>
      <md-field class="md-layout-item md-size-100">
        <label>{{ $t('password') }}</label>
        <md-input v-model="password"></md-input>
      </md-field>
      <div class="md-layout-item md-size-100">
        <md-button class="md-dense md-raised md-primary">{{ $t('create') }}</md-button>
        <md-button class="md-dense md-raised md-accent">{{ $t('reset') }}</md-button>
      </div>
    </form>
  </div>
</template>

<script>
import {PrivateKey, key} from 'bitsharesjs';

export default {
  name: 'Accounts',
  data() {
    return {
      username: null,
      password: null,
    };
  },
  methods: {

  },
  created() {
    console.log('created');
  },
  mounted(){
    const seed = 'testfortest';
    const pkey = PrivateKey.fromSeed( key.normalize_brainKey(seed) );

    console.log("\nPrivate key:", pkey.toWif());
    console.log("Public key :", pkey.toPublicKey().toString(), "\n");

  },
}
</script>

<style scoped>
</style>
