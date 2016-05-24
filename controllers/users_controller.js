var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var models = require('../models');
var Fact = require('../models/Fact.js');
var User = require('../models/User.js');
var client = require('../config/sms_message'); //require twilio client object
var passwords = require('../config/passwords'); //require twilio passwords
var session = require('express-session');

//render user sign up page/form
router.get('/users/new', function(req,res) {
  res.render('users/new');
});

//render user sign in page/form
router.get('/users/sign-in', function(req,res) {
  res.render('users/sign_in');
});

//render user to home page when signing out
router.get('/users/sign-out', function(req,res) {
  req.session.destroy(function(err) {
     res.redirect('/home');
  });
});

//render home page as index.handlebars
router.get('/home', function(req,res) {
  res.render('index');
});

//create new user
router.post('/users/create', function(req,res) {
  models.User.findAll({
    where: {$or: [{email: req.body.email}, {username: req.body.username}]}
  }).then(function(users) {
    res.redirect('/home');

    if(users.length > 0) {
      res.send("We already have an account with this username");
    } else {

      //hash brownies man!
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {

          //i love sequelize :!
          models.User.create({
            username: req.body.username,
            email: req.body.email,
            password_hash: hash,
            phone: req.body.phone,
            countrycode: req.body.countrycode
          }).then(function(user){

            req.session.logged_in = true;
            req.session.user_id = user.id;
            req.session.user_email = user.email;
            req.session.username = user.username;
            res.redirect('/home');
          });
        });
      });
    }
  });
});

//if user trys to sign in with the wrong password or email tell them that on the page
router.post('/users/login', function(req, res) {
  models.User.findOne({
    where: {email: req.body.email}
  }).then(function(user) {
    res.redirect('/home');

    bcrypt.compare(req.body.password, user.password_hash, function(err, result) {
        if (result == true){

          //make a session, bro
          req.session.logged_in = true;
          req.session.user_id = user.id;
          req.session.user_email = user.email;
          req.session.username = user.username;
          req.session.phone = user.phone;
          req.session.countrycode = user.countrycode;
          // res.redirect('/home');
        }
    });
  });
});

//post category value of category id
router.post('/categories/fact/:id', function(req, res) {
  if(req.session.logged_in) {

    //some more fact finding joy!
    models.Fact.findAll({
      where: {$and: [{user_id: req.session.user_id}, {category_id: req.params.id}]}
    }).then(function(facts) {

      texter.sendMessage({

          to: "+" + req.session.countrycode + req.session.phone,
          from: passwords.twilioNumber,
          body: "hi"               //result[randomNum]

      })
    })
  }else {
    console.log("hello world");
  }
})

// router.post('/users/create', function(req,res) {
//   bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash(req.body.password, salt, function(err, hash) {
//       User.create({
//         username: req.body.username,
//         email: req.body.email,
//         password_hash: hash,
//         phone: req.body.phone,
//         countrycode: req.body.countrycode
//       }).then(function(user){
//
//         req.session.logged_in = true;
//         req.session.user_id = user.id;
//         req.session.user_email = user.email;
//         req.session.username = user.username;
//         res.redirect('/facts')
//       });
//     });
//
//     sequelize.query('SELECT * FROM facts LEFT JOIN categories AS cats ON cats.id = facts.category_id LEFT JOIN subscriptions AS subs ON subs.category_id = cats.id LEFT JOIN user_facts AS ufs ON ufs.fact_id = facts.id WHERE subs.user_id = ' +req.session.user_id+ 'AND ufs.user_id =' +req.session.user_id+ 'AND facts.id != ufs.fact_id').then(function(facts) {
//
//
//     });
//       // sequelize.query('INSERT INTO subscriptions (user_id, category_id), [?, ?]', [req.session.user_id, req.params.id (this needs to be the category id number) ]);
//   });
// });

// router.post('/users/sendMessage', function() {
//   var targetNumber,
//       messageBody
//   if(req.session.logged_in){
//     User.findOne({where:{username: req.session.username}}).then(function(data){
//       targetNumber = data.phone;
//     }).then(function() {
//       //i get a SQL return, i want the string from it
//       messageBody = data.fact;
//     }).then(function() {
//       client.sendMessage({
//       // to: req.session.number,
//         to: targetNumber,
//         from: config.twilioNumber,
//         // body: 'Nice 2 Know Test Text Message.'
//         body: messageBody
//       });
//     });
//   }
// })

module.exports = router;
