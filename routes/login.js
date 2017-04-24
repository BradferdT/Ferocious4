var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  res.render('login/index', { title: 'ting'});
})

module.exports = router;
