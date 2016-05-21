$(document).ready(function() {
  $('#subscribeBtn').on('click', function() {
    $('#subscribeBtn').toggleClass('.subscribed');
    $('#subscribeBtn').html('SUBSCRIBED');
  });
  $('#unsubBtn').on('click', function() {
    $('#subscribeBtn').html('+Subscribe');
  })
  $('#sendNowBtn').on('click', function() {
    $('#sendNowBtn').html('Sent!');
  });
});
