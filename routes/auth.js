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

router.get('/login', function(req, res, next){
  if(req.signedCookies.username){
    res.redirect('/');
  }else{
    next();
  }
})

router.get('/cpanel/', function(req, res, next){
  if(req.signedCookies.admin == 'false'){
    res.redirect('/');
  }else if(req.signedCookies.admin == 'true'){
    next();
  }else{
    res.redirect('/');
  }
})

router.get('/main', function(req, res, next){
  if(req.signedCookies.username){
    next();
  }else{
    res.redirect('/');
  }
})

router.get('/login/edit', function(req, res, next){
  if(req.signedCookies.username){
    next();
  }else{
    res.redirect('/login');
  }
})

router.get('/about', function(req, res, next){
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
    res.render('about', {navBarText: barText, link: linkForBtn, show: loggedIn, permissions: admin});
})


module.exports = router;
