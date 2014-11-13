var express = require('express');
var router = express.Router();
var apiURL = "http://fforres.koding.io:3007/api"
var siteUrl = "http://fforres.koding.io:3006"
	/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', {
		title: 'Sr.piropos! -> Los mejores 10 piropos'
	});
});
router.get('/piropo', function(req, res) {
	res.redirect('/');
});

router.get('/piropo/:id', function(req, res) {
	var request = require('request')
	request({
		method: 'GET',
		uri: apiURL+'/piropos/'+req.params.id,
	}, function(error, response, body) {
		console.log(response.statusCode)
		if (response.statusCode == 200) {
			var thebody = JSON.parse(body);
			res.render('index', {
				title: 'Sr. Piropos',
				FBmeta: {
					"title":"¡Que buen piropo!",
					"site_name":"Sr. Piropos",
					"description":thebody.texto,
					"image":siteUrl+"/images/parejasilla.jpg",
					"app_id":"861140763904895",
					"type":"article"
				}
			});
		} else {
			res.render('index', {
				title: 'Sr.Piropos!'
			});
		}
	})

});

router.get('/usuario/:nombre', function(req, res) {
	res.render('index', {
		title: 'Sr.Piropos! - Piropos de @' + req.params.nombre
	});
});
router.get('/*', function(req, res) {
	res.redirect('/');
});

module.exports = router;