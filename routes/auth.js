var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next){
  if(req.signedCookies.username){
    res.render('index', {navBarText: req.signedCookies.username, link: '/home', show: true});
  }else{
    res.render('index', {navBarText: 'Login', link: '/login', show: false});
  }
})

router.get('/logout', function(req, res, next){
  res.clearCookie('username');
  res.clearCookie('email');
  res.redirect('/');
})




module.exports = router;
