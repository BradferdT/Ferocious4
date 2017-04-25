var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', (req, res) => {
  Promise.all([
    knex.raw(`select * from lists where user_id = ${1}`)
  ])
      .then((data) => {
        data = data.map(x => x.rows);
        console.log(data);
        res.render('home/index', {
          userLists: data[0]
        });
      });
});

module.exports = router;
