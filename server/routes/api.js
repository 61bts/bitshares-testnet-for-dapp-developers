var express = require('express');
var router = express.Router();

const ChainApi = require('../libs/ChainApi');

// eslint-disable-next-line no-unused-vars
router.get('/', function(req, res) {
  res.send('test api');
});

router.get('/global_config', function(req, res) {
  const globalConfig = ChainApi.getGlobalConfig();
  return res.send(JSON.stringify(globalConfig));
});

router.post('/create_user', function(req, res) {
  const data = req.body;
  if (!data.username || !data.password) {
    return res.send(JSON.stringify({
      status: false,
      msg: 'username or password is empty.',
    }));
  }
  ChainApi.checkUsername(data.username).then((account) => {
    console.log(account);
    if (account !== null) {
      return res.send(JSON.stringify({
        status: false,
        msg: 'Username has been registered!',
      }));
    }
    ChainApi.registerUser(data.username, data.password, 'ety001', 'ety001')
      .then((result) => {
        if (result === true) {
          return res.send(JSON.stringify({
            status: true,
            msg: 'Success!',
          }));
        }
        return res.send(JSON.stringify({
          status: false,
          msg: 'Username has been registered!',
        }));
      });
  });
});

router.post('/bot_transfer', function(req, res) {
  const data = req.body;
  if (!data.username) {
    return res.send(JSON.stringify({
      status: false,
      msg: 'username is empty.',
    }));
  }
  ChainApi.checkUsername(data.username).then((account) => {
    if (account === null) {
      return res.send(JSON.stringify({
        status: false,
        msg: 'Username has not registered!',
      }));
    }
    ChainApi.transfer('ety001', data.username, '1000')
      .then((result) => {
        if (result === true) {
          return res.send(JSON.stringify({
            status: true,
            msg: 'Success!',
          }));
        }
        return res.send(JSON.stringify({
          status: false,
          msg: result,
        }));
      });
  });
});

module.exports = router;
