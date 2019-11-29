var express = require('express');
var router = express.Router();

// eslint-disable-next-line no-unused-vars
router.get('/', function(req, res, next) {
  res.send('test api');
});

module.exports = router;