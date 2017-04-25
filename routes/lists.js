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
        res.render('home/index.ejs', {
          userLists: data[0]
        });
      });
});

router.post('/lists/add', (req, res) => {
  console.log('starting');
  knex.raw(`insert into lists values (default, '${req.body.name}', ${+req.body.user_id}, '${req.body.description}', default, default, default)`)
    .then(() => {
      console.log('two');
      res.redirect('/home');
    })
})

module.exports = router;
