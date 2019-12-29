import axios from 'axios';

const devEnv = process.env.NODE_ENV === 'development' ? true : false;

let serverApi = null;
class ServerApi {
  constructor() {
    if (serverApi !== null) return;
    if (devEnv) {
      this.serverUrl = 'http://localhost:3000';
    } else {
      this.serverUrl = '';
    }
  }

  getUrl(path) {
    return `${this.serverUrl}${path}`;
  }

  createUser(username, password) {
    const url = this.getUrl('/api/v1/create_user');
    return axios.post(url, {
      username, password
    });
  }

  botTransfer(username) {
    const url = this.getUrl('/api/v1/bot_transfer');
    return axios.post(url, {
      username
    });
  }

  getGlobalConfig() {
    const url = this.getUrl('/api/v1/global_config');
    return axios.get(url);
  }
}

serverApi = new ServerApi();

export default serverApi;
