var cron = require('node-cron');

cron.schedule('* 12 * * 1-5', function(){
  console.log('running a task Monday - Friday at noon');
});

module.exports = cron;
