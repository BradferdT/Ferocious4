var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
};

let dayParse = (aDate) => {
  return (aDate.getYear() + 1900) + '-' + (aDate.getMonth() + 1).pad(2) + '-' + aDate.getDate().
pad(2);
}


/* GET home page. */
router.get('/', (req, res) => {
  console.log(req.signedCookies);
  Promise.all([
    knex.raw(`select * from lists join users on users.id = lists.user_id where users.username = '${req.signedCookies.username}'`),
    knex.raw(`select id from users where username = '${req.signedCookies.username}'`)
  ])
      .then((data) => {
        var loggedIn = false, admin = false, linkForBtn = '/login', barText = 'Login';
        if(req.signedCookies.username && req.signedCookies.admin == 'true'){
          loggedIn = true;
          admin = true;
          linkForBtn = '/home'
          barText = req.signedCookies.username
        }else if(req.signedCookies.username){
          loggedIn = true;
          linkForBtn = '/home'
          barText = req.signedCookies.username
        }
        data = data.map(x => x.rows);
        console.log(data[1][0].id);
        res.render('home/index.ejs', {
          userLists: data[0],
          user_id: data[1][0].id,
          dayParse: dayParse,
          navBarText: barText,
          link: linkForBtn,
          show: loggedIn,
          permissions: admin
        });
      });
});

router.get('/:id/lists', (req, res) => {
  Promise.all([
    knex.raw(`select * from lists where `)
  ])
})

router.post('/lists/add', (req, res) => {
  console.log('starting');
  knex.raw(`insert into lists values (default, '${req.body.name}', ${+req.body.user_id}, '${req.body.description}', default, default, default)`)
    .then(() => {
      console.log('two');
      res.redirect('/home');
    })
})

module.exports = router;
