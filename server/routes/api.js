var express = require('express');
var router = express.Router();

const ChainApi = require('../libs/ChainApi');

// eslint-disable-next-line no-unused-vars
router.get('/', function(req, res) {
  res.send('test api');
});

router.get('/create_user', function(req, res) {
  res.send('');
});
router.get('/bot_transfer', function(req, res) {
  res.send('');
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
  console.log(req.body);
  res.send('bot_transfer');
});

module.exports = router;
