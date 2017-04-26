var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');

var editMsg = 'Back';

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
      res.redirect('/main');
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
                found_user_admin = found.rows[0].admin;
      if (bcrypt.compareSync(req.body.password, found_user_password)){
                 res.cookie("username", req.body.username, {signed: true});
                 res.cookie('email', found_user_email, {signed: true});
                 res.cookie('admin', found_user_admin, {signed: true});
                 res.redirect("/");
                } else {
                 res.render('login/', {msg: 'Incorrect Username or Password'})
               }
             } else {
               res.render('login/', {msg: 'Username not found'});
             }
    })
  }
})

router.get('/edit', function(req, res, next){
  var username = req.signedCookies.username;
  knex.raw('SELECT * FROM users WHERE username = ?', [username])
  .then(function(found){
    if(found.rows.length != 0){
      res.render('login/edit', {passInData: found.rows[0], msg: editMsg})
    }else{
      res.redirect('/')
    }
  })
})

router.post('/edit', function(req, res, next){
  var newPassword = 'undefined', newEmail = 'undefined';

  if(req.body.password != ''){
    var crypted = bcrypt.hashSync(req.body.password, 8);
    newPassword = knex.raw('UPDATE users SET password = ? WHERE username = ?', [crypted, req.signedCookies.username]);
  }
  if(req.body.email != ''){
    newEmail = knex.raw('UPDATE users SET email = ? WHERE username = ?', [req.body.email, req.signedCookies.username]);
  }
  Promise.all([newPassword, newEmail])
  .then(function(data){
    if(req.body.email != ''){
      res.cookie('email', req.body.email, {signed: true});
    }
    //res.cookie('email', data[1].rows[0].email, {signed: true});
    editMsg = 'Account Updated';
    res.redirect('/login/edit');
  })
  .catch(function(err){
    if(err.constraint == 'users_email_unique'){
      console.log('entered in user email unique')
      editMsg = 'Email already used';
    }
    res.redirect('/login/edit');
  })
})


module.exports = router;
