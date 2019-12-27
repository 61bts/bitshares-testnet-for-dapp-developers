const btsJs = require('bitsharesjs');
const btsWs = require('bitsharesjs-ws');

let chainApi = null;

class ChainApi {
  constructor(api = 'ws://127.0.0.1:18090/ws') {
    if (chainApi !== null) return;
    if (!process.env.PRIV_KEY) {
      throw new Error('not_set_priv_key');
    }
    this.privKey = process.env.PRIV_KEY;
    this.pKey = btsJs.PrivateKey.fromWif(this.privKey);
    this.apiUrl = api;
    btsWs.ChainConfig.networks['LiuyeTest'] = {
      core_asset: 'TEST',
      address_prefix: 'TEST',
      chain_id: '2d20869f3d925cdeb57da14dec65bbc18261f38db0ac2197327fc3414585b0c5',
    };
    btsWs.Apis.instance(this.apiUrl, true).init_promise.then((res) => {
      console.log("connected to:", res[0].network_name, "network");
    });
  }

  checkUsername(username) {
    return btsJs.FetchChain("getAccount", username);
  }

  generatePassword() {
    const seed = Math.random().toString(36).substr(2);
    const pkey = btsJs.PrivateKey.fromSeed( btsJs.key.normalize_brainKey(seed) );
    return `P${pkey.toWif()}`;
  }

  generateKeyFromPassword(accountName, role, password) {
    const seed = accountName + role + password;
    const privKey = btsJs.PrivateKey.fromSeed(seed);
    const pubKey = privKey.toPublicKey().toString();
    return {privKey, pubKey};
  }

  registerUser(username, password, registrar, referrer) {
    const referrerPercent = 0;
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

    try {
      return Promise.all([
        btsJs.FetchChain("getAccount", registrar),
        btsJs.FetchChain("getAccount", referrer)
      ]).then((res) => {
        const [chainRegistrar, chainReferrer] = res;
        const tr = new btsJs.TransactionBuilder();
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
          memo: {
              weight_threshold: 1,
              account_auths: [],
              key_auths: [[memoPubkey, 1]],
              address_auths: []
          },
          options: {
              memo_key: memoPubkey,
              voting_account: "1.2.1",
              num_witness: 0,
              num_committee: 0,
              votes: []
          }
        });
        return tr.set_required_fees().then(() => {
          tr.add_signer(this.pKey);
          console.log("serialized transaction:", tr.serialize());
          tr.broadcast();
          return true;
        });
      }).catch((err) => {
        console.log('err:', err);
      });
    } catch(e) {
      console.log('unexpected_error:', e);
    }
  }

  transfer(fromAccount, toAccount, amount = '0', memo = null, asset = 'TEST', feeAsset = 'TEST') {
    const sendAmount = {
      amount,
      asset,
    };

    return Promise.all([
      btsJs.FetchChain("getAccount", fromAccount),
      btsJs.FetchChain("getAccount", toAccount),
      btsJs.FetchChain("getAsset", sendAmount.asset),
      btsJs.FetchChain("getAsset", feeAsset)
    ]).then((res)=> {
      const [fromAccount, toAccount, sendAsset, feeAsset] = res;

      let memo_object = undefined;
      if (memo) {
        const memoFromKey = fromAccount.getIn(["options","memo_key"]);
        const memoToKey = toAccount.getIn(["options","memo_key"]);
        const nonce = btsJs.TransactionHelper.unique_nonce_uint64();

        memo_object = {
          from: memoFromKey,
          to: memoToKey,
          nonce,
          message: btsJs.Aes.encrypt_with_checksum(
            this.pKey,
            memoToKey,
            nonce,
            memo
          )
        }
      }

      const tr = new btsJs.TransactionBuilder()
      const precision = sendAsset.get('precision');

      tr.add_type_operation('transfer', {
        fee: {
          amount: 0,
          asset_id: feeAsset.get("id")
        },
        from: fromAccount.get("id"),
        to: toAccount.get("id"),
        amount: {
          amount: sendAmount.amount * 10 ** precision,
          asset_id: sendAsset.get("id")
        },
        memo: memo_object
      });

      return tr.set_required_fees().then(() => {
        tr.add_signer(this.pKey);
        console.log("serialized transaction:", tr.serialize());
        tr.broadcast();
        return true;
      });
    }).catch((err) => {
      console.log(err);
      return err.message;
    });
  }
}

chainApi = new ChainApi();

module.exports = chainApi;
