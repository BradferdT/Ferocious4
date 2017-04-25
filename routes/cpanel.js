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

router.get('/:id', function(req, res, next) {
  knex.raw(`SELECT * from users WHERE id= ${req.params.id}`).then(function(data) {
    res.render('cpanel/admin', { title: 'admin_mode' });
  })
});

module.exports = router;
