var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
router.get('/', function(req, res, next){
  res.render('login/index', { msg: 'Back'});
})

router.post('/signup', function(req, res, next){
  if(req.body.email != null){
    var crypted = bcrypt.hashSync(req.body.password, 8);
    knex.raw('INSERT into users values (DEFAULT, ?, ?, ?)', [req.body.username, crypted, req.body.email])
    .then(function(){
      res.send('Created account')
    })
    .catch(function(err){
      var message = 'Error';
      console.log(err.constraint == 'users_username_unique');
      if(err.constraint == 'users_username_unique'){
        message = 'Username is taken!';
      }else if(err.constraint == 'users_email_unique'){
        message = 'Email is taken!'
      }
      res.render('login/', {msg: message});
    })
  }else{
    
  }
})
module.exports = router;
