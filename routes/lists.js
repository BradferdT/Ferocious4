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
    knex.raw(`select *, lists.id as id from lists join users on users.id = lists.user_id where users.username = '${req.signedCookies.username}'`),
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
        console.log(data[0]);
        res.render('home/index.ejs', {
          userLists: data[0],
          userListsLength: data[0].length,
          user_id: data[1][0].id,
          dayParse: dayParse,
          navBarText: barText,
          link: linkForBtn,
          show: loggedIn,
          permissions: admin
        });
      });
});

router.get('/info/:id/lists', (req, res) => {
  knex.raw(`select * from content join lists on content.list_id = lists.id where lists.id = ${req.params.id}`)
    .then((data) => {
      res.json(data);
    });
});

router.get('/:id/lists', (req, res) => {
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
  Promise.all([
    knex.raw(`select * from lists where id = ${req.params.id}`),
    knex.raw(`select id from users where username = '${req.signedCookies.username}'`),
    knex.raw(`select *, content.id as id from content join lists on content.list_id = lists.id where lists.id = ${req.params.id}`)
  ]).then((data) => {
    data = data.map(x => x.rows);
    if(data[2][0] && data[2][0].user_id == data[1][0].id){
      console.log(data[2][0].user_id, data[1][0].id);
    }
    console.log(data[2]);
    res.render('home/show.ejs', {
      userLists: data[0],
      userListsLength: data[0].length,
      user_id: data[1][0].id,
      listContent: data[2],
      dayParse: dayParse,
      navBarText: barText,
      link: linkForBtn,
      show: loggedIn,
      permissions: admin
    });
  }).catch((data) => {
    console.log(data);
  });
});

router.post('/content/add', (req, res) => {
  console.log(req.body);
  knex.raw(`insert into content values (default, ${+req.body.list_id}, ${+req.body.walmart_id}, '${req.body.item_name}', '${req.body.category_path}', ${+req.body.sale_price}, '${req.body.description}', '${req.body.thumbnail_image}', '${req.body.medium_image}', '${req.body.large_image}', '${req.body.product_url}', '${req.body.customer_rating}', '${req.body.available_online}', default, default)`)
      .then(() => {
        res.redirect(`/main/${+req.body.list_id}/lists`);
      }).catch((err) => {
        console.log(err);
      })
});

router.post('/content/complete', (req, res) => {
  console.log(req.body.id);
  knex.raw(`update content set completed = true where id = ${req.body.id}`)
      .then(() => {
        res.redirect(`/main/${+req.body.list_id}/lists`);
      });
});

router.post('/content/uncomplete', (req, res) => {
  knex.raw(`update content set completed = false where id = ${req.body.id}`)
      .then(() => {
        res.redirect(`/main/${+req.body.list_id}/lists`);
      });
});

router.post('/content/delete', (req, res) => {
  knex.raw(`delete from content where id = ${req.body.id}`)
      .then(() => {
        res.redirect(`/main/${+req.body.list_id}/lists`);
      });
});

router.post('/lists/add', (req, res) => {
  console.log('starting');
  knex.raw(`insert into lists values (default, '${req.body.name}', ${+req.body.user_id}, '${req.body.description}', default, default, default)`)
    .then(() => {
      console.log('two');
      res.redirect('/main');
    });
});

module.exports = router;
