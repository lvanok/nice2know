var express = require('express');
var router = express.Router();
var Subscription = require('../models/subscription.js');
var User = require('../model/User.js');


router.get('/', function(req,res) {
  res.redirect('/subscriptions');
});

router.get('/subscriptions', function() {
  Subscription.findAll({}).then(function(result) {
    var hbsObject = {subscriptions: result}
    res.render('index', hbsObject);
  });
});

// create new subscription (subscribe)
router.post('/subscriptions/create', function(req,res) {
  Subscription.create({
    user_id: req.session.user_id,
    category_id: req.params.category_id
  });
});

// remove a subscription (unsubscribe)
router.delete('/subscriptions/:id/destroy', function(req, res) {
  Subscription.destroy({
    where: {
      user_id: req.session.user_id,
      category_id: req.params.category_id
    }
  });
});
