var express = require('express');
var router = express.Router();
var Category = require('../models/category.js');
var User = require('../models/User.js');
var session = require('express-session');


router.get('/', function(req,res) {
    res.redirect('/categories')
});

router.get('/categories', function(req,res) {

    Category.findAll({}).then(function(result){
        var hbsObject = {category : result}
            res.render('index', hbsObject);
    })
});

router.post('/categories/create', function(req,res) {
    Category.create({
        category: req.body.name,
            topic: req.body.topic }).then(function(result){
                res.redirect('/categories');

    });
});

router.put('/categories/update/:id', function(req,res) {
    Category.update({
        devoured: req.body.topic
  },
  {
        where: { id : req.params.id }
    }
        ).then(function (result) {
            res.redirect('/categories');
  },
        function(rejectedPromiseError){
            console.log(rejectedPromiseError);
    });
});

router.delete('/categories/delete/:id', function(req,res) {
    Category.destroy({
        where: { id : req.params.id }
            }).then(function (result) {
                res.redirect('/categories');
    },
        function(rejectedPromiseError){
            console.log(rejectedPromiseError);
    });
});

module.exports = router;
