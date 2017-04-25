var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', (req, res) => {
  knex.raw(`select * from lists where user_id = ${'ferocious4'}`)
      .then((data) => {
        res.render('index/index', {
          userLists: data.rows
        });
      });
});

module.exports = router;
