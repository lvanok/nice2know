var express = require('express');
var router = express.Router();
var Category = require('../models/category.js');
var User = require('../model/User.js');
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
//select * from facts where category_id = chosen 
router.put('/categories/send/:id', function(req,res) {
    Fact.findAll({
        {
            where: { category_id : req.body.id }
        }
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
