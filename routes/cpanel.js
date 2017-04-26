var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET All users. */
router.get('/', function(req, res, next) {
  knex.raw('SELECT * from users').then(function(data) {
    console.log(data)
    res.render('cpanel/index', { title: 'admin_mode',
                                 users: data.rows});
    })
});

/* GET a single user */
router.get('/show/:name', function(req, res, next) {
  knex.raw(`SELECT users.id, users.username, lists.list_name FROM users JOIN lists ON users.id = lists.user_id WHERE users.username='${req.params.name}'`).then(function(data) {
    res.render('cpanel/show', { title: 'user',
                                user: data.rows[0]});
  })
});

/* UPDATE a user */
router.get('/edit/:id', function(req, res, next) {
   knex.raw(`SELECT * from users WHERE id=${req.params.id}`)
       .then(function(data){
         res.render('cpanel/edit', { userEdit: data.rows[0]});
       })
});

router.post('/:id', function(req, res, next) {
console.log(req.body.name);
  knex.raw(`UPDATE users SET username = '${req.body.username}',
                           password = '${req.body.password}',
                           email = '${req.body.email}' WHERE id = ${req.body.id}`)
      .then(function(){
        res.redirect('/cpanel');
      })
});

module.exports = router;
