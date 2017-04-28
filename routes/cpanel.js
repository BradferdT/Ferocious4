var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');

/* GET All users. */
router.get('/', function(req, res, next) {
  knex.raw('SELECT * from users').then(function(data) {
    var admin = true, loggedIn = true, barText = req.signedCookies.username;
    res.render('cpanel/index', { title: 'admin_mode',
                                 users: data.rows,
                                 permissions: admin,
                                 show: loggedIn,
                                 navBarText: barText});
    })
});

/* UPDATE a user */

router.post('/update/:id', function(req, res, next) {
var newUser = 'undefined';
var newPass = 'undefined';
var newEmail = 'undefined';
var newPriv = 'undefined';

if(req.body.username != '') {
  newUser = knex.raw('UPDATE users SET username = ? WHERE id = ?',
  [req.body.username, req.params.id])
}
if(req.body.password != '') {
  var crypted = bcrypt.hashSync(req.body.password, 8);
  newPass = knex.raw('UPDATE users SET password = ? WHERE id = ?',
  [crypted, req.params.id]);
}
if(req.body.email != '') {
  newEmail = knex.raw('UPDATE users SET email = ? WHERE id = ?',
  [req.body.email, req.params.id])
}
if(req.body.admin != '') {
  newPriv = knex.raw('UPDATE users SET admin = ? WHERE id = ?',
  [req.body.admin, req.params.id])
}

Promise.all([newPass, newEmail, newPriv, newUser])
      .then(function(){
        res.redirect('/cpanel');
      })
});

/* DELETE user account */
router.get('/delete/:id', function(req, res, next) {
  knex.raw(`DELETE from users WHERE id=${req.params.id}`).then(function(){
    console.log('deleted');
    res.redirect('/cpanel')
  })
})

router.post('/create', function(req,res,next){
  var crypted = bcrypt.hashSync(req.body.password, 8);
  knex.raw('INSERT into users values (DEFAULT, ?, ?, ?, ?)', [req.body.username, crypted, req.body.email, req.body.admin])
  .then(function(){
    res.redirect('/cpanel');
  })
})



module.exports = router;
