var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  knex.raw('SELECT * from users').then(function(data) {
    console.log(data)
    res.render('cpanel/index', { title: 'admin_mode',
                                 users: data.rows});
    })
});

router.get('/show/:name', function(req, res, next) {
  knex.raw(`SELECT users.id, users.username, lists.list_name FROM users JOIN lists ON users.id = lists.user_id WHERE users.username='${req.params.name}'`).then(function(data) {
    res.render('cpanel/show', { title: 'user',
                                user: data.rows[0]});
  })
});

module.exports = router;
