var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
router.get('/', function(req, res, next){
  res.render('login/index', { msg: 'Back'});
})

router.post('/signup', function(req, res, next){
  var username = req.body.username.toLowerCase();
  if(req.body.email != ''){
    var crypted = bcrypt.hashSync(req.body.password, 8);
    knex.raw('INSERT into users values (DEFAULT, ?, ?, ?)', [username, crypted, req.body.email])
    .then(function(){
      res.cookie('username', username, {signed: true});
      res.cookie('email', req.body.email, {signed: true});
      res.send('Created account')
    })
    .catch(function(err){
      var message = 'Error';
      if(err.constraint == 'users_username_unique'){
        message = 'Username is taken!';
      }else if(err.constraint == 'users_email_unique'){
        message = 'Email is taken!'
      }
      res.render('login/', {msg: message});
    })
  }else{
    knex.raw('SELECT * FROM users WHERE username = ?', [username])
    .then(function(found){
      console.log(found.rows.length);
      if (found.rows.length != 0){
                found_user_password = found.rows[0].password;
                found_user_email = found.rows[0].email;
      if (bcrypt.compareSync(req.body.password, found_user_password)){
                 res.cookie("username", req.body.username, {signed: true});
                 res.cookie('email', found_user_email, {signed: true});
                 res.redirect("/login");
                } else {
                 res.render('login/', {msg: 'Incorrect Username or Password'})
               }
             } else {
               res.render('login/', {msg: 'Username not found'});
             }
    })
  }
})
module.exports = router;
