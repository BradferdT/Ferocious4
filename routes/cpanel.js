var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');

/* GET All users. */
router.get('/', function(req, res, next) {
  knex.raw('SELECT * from users').then(function(data) {

    res.render('cpanel/index', { title: 'admin_mode',
                                 users: data.rows});
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
    res.redirect('/cpanel')
  })
})



module.exports = router;
