import {PrivateKey, key, FetchChain, TransactionBuilder} from 'bitsharesjs';
import {Apis, ChainConfig} from 'bitsharesjs-ws';

let chainApi = null;

class ChainApi {
  constructor(api = 'ws://127.0.0.1:18090/ws') {
    if (chainApi !== null) return;
    this.apiUrl = api;
    ChainConfig.networks['LiuyeTest'] = {
      core_asset: 'TEST',
      address_prefix: 'TEST',
      chain_id: 'd5dfe0da7cda9426dc4761752d889d44401c5f04f76c17970e90437b02c038d4',
    };
    Apis.instance(this.apiUrl, true).init_promise.then((res) => {
      console.log("connected to:", res[0].network_name, "network");
    });
  }

  setPrivKey(privKey) {
    this.privKey = privKey;
  }

  checkUsername(username) {
    return FetchChain("getAccount", username);
  }

  generatePassword() {
    const seed = Math.random().toString(36).substr(2);
    const pkey = PrivateKey.fromSeed( key.normalize_brainKey(seed) );
    return `P${pkey.toWif()}`;
  }

  generateKeyFromPassword(accountName, role, password) {
    const seed = accountName + role + password;
    const privKey = PrivateKey.fromSeed(seed);
    const pubKey = privKey.toPublicKey().toString();
    return {privKey, pubKey};
  }

  registerUser(username, password, registrar, referrer) {
    const pKey = PrivateKey.fromWif(this.privKey);
    const referrerPercent = 10000;
    const {pubKey: ownerPubkey} = this.generateKeyFromPassword(
      username,
      'owner',
      password
    );
    const {pubKey: activePubkey} = this.generateKeyFromPassword(
      username,
      'active',
      password
    );
    const {pubKey: memoPubkey} = this.generateKeyFromPassword(
      username,
      'memo',
      password
    );
    console.log(username, password, ownerPubkey, activePubkey, memoPubkey);

    Promise.all([
      FetchChain("getAccount", registrar),
      FetchChain("getAccount", referrer)
    ]).then((res) => {
      const [chainRegistrar, chainReferrer] = res;
      const tr = new TransactionBuilder();
      tr.add_type_operation("account_create", {
        fee: {
          amount: 0,
          asset_id: 0
        },
        registrar: chainRegistrar.get("id"),
        referrer: chainReferrer.get("id"),
        referrer_percent: referrerPercent,
        name: username,
        owner: {
            weight_threshold: 1,
            account_auths: [],
            key_auths: [[ownerPubkey, 1]],
            address_auths: []
        },
        active: {
            weight_threshold: 1,
            account_auths: [],
            key_auths: [[activePubkey, 1]],
            address_auths: []
        },
        options: {
            memo_key: memoPubkey,
            voting_account: "1.2.17",
            num_witness: 0,
            num_committee: 0,
            votes: []
        }
      });
      tr.set_required_fees().then(() => {
        tr.add_signer(pKey);
        console.log("serialized transaction:", tr.serialize());
        tr.broadcast();
      });
    }).catch((err) => {
      console.log('err:', err);
    });
  }
}

chainApi = new ChainApi();

export default chainApi;
