import {PrivateKey, key, FetchChain} from 'bitsharesjs';
import {Apis, ChainConfig} from 'bitsharesjs-ws';

let chainApi = null;

class ChainApi {
  constructor(api = 'wss://api-testnet.61bts.com') {
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

  checkUsername(username) {
    return FetchChain("getAccount", username);
  }

  generatePassword() {
    const seed = Math.random().toString(36).substr(2);
    const pkey = PrivateKey.fromSeed( key.normalize_brainKey(seed) );
    return `P${pkey.toWif()}`;
  }
}

chainApi = new ChainApi();

export default chainApi;