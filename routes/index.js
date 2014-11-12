var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/demo1', function(req, res){
   res.render('demo1', {title: 'Demo1' });
});

router.get('/demo2', function(req, res){
    res.render('demo2', {title: 'Demo2' });
});

router.get('/demo3', function(req, res){
    res.render('demo3', {title: 'Demo3' });
});


module.exports = router;
