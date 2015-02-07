var express = require('express');
var router = express.Router();
var apiURL = "http://api.srpiropos.com/api";
var siteUrl = "http://srpiropos.com";
	/* GET home page. */
router.get('/views/*', function(req, res) {
	console.log(req.params["0"])
	res.render(req.params["0"]);
});

router.get('*', function(req, res) {
	res.render('index', {
		title: 'Sr.piropos!'
	});
});

module.exports = router;