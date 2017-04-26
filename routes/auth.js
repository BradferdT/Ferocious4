var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next){
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
    res.render('index', {navBarText: barText, link: linkForBtn, show: loggedIn, permissions: admin});
})

router.get('/logout', function(req, res, next){
  res.clearCookie('username');
  res.clearCookie('email');
  res.clearCookie('admin');
  res.redirect('/');
})




module.exports = router;
