var express = require('express');
var router = express.Router();
var models = require('../models');
var Fact = require('../models/Fact.js');
var User = require('../models/User.js');
var sequelize = require('../models/index.js');
var Category = require('../models/Category.js');
var texter = require('../config/sms_message');
var passwords = require('../config/passwords');

// grab user_id's for all users who are subscribed to any category
sequelize.query('SELECT DISTINCT user_id FROM user_categories;').then(function(subUsers) {
  console.log(subUsers);
  // wrap function in a for loop to run for each user who is signed up to receive texts
  for (var i = 0; i < subUsers.length; i++) {
    sequelize.sequelize.query('SELECT * FROM facts INNER JOIN user_categories ON facts.category_id=user_categories.category_id AND user_categories.user_id=' + subUsers[i].user_id + ';').then(function(facts) {
        var randNum = Math.floor(Math.random() * facts.length);

        console.log(facts[0][randNum].fact);
        var fixPhone = subUsers[i].phone.replace('-', '');
        var fullPhone = '+' + subUsers[i].countrycode + fixPhone;
        texter.sendMessage({

            to: fullPhone,  // "+" + req.session.countrycode + req.session.phone,
            from: passwords.twilioNumber,
            body: facts[0][randNum].fact //result[randomNum]
        });
    });
  }
});
