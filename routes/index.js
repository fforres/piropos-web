var express = require('express');
var router = express.Router();
var apiURL = "http://fforres.koding.io:3007/api"
  /* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Sr.Piropo! -> Los mejores 10 piropos'
  });
});
router.get('/piropo', function(req, res) {
  res.redirect('/');
});

router.get('/piropo/:id', function(req, res) {
  res.render('index', {
    title: 'Sr.Piropo! - Piropo -> ' + req.params.seo
  });
});

router.get('/usuario/:nombre', function(req, res) {
  res.render('index', {
    title: 'Sr.Piropo! - Piropos de @' + req.params.nombre
  });
});
router.get('/*', function(req, res) {
  res.redirect('/');
});

module.exports = router;