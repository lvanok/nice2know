var express = require('express');
var router = express.Router();
var Subscription = require('../models/subscription.js');

router.get('/', function(req,res) {
  res.redirect('/subscriptions');
});

router.get('/subscriptions', function() {
  Subscription.findAll({}).then(function(result) {
    var hbsObject = {subscriptions: result}
    res.render('index', hbsObject);
  });
});

'SELECT user_id, category_id FROM subscriptions WHERE user_id = req.session.user_id;'

router.post('/subscriptions/create', function(req,res) {
  Subscription.create({
    subscription: req.body.subscribed,
    user_id: req.session.user_id,
  });
});
