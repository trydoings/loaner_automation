var express = require('express');
var router = express.Router();
var users = require('./models/loaner.js');
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we're connected!");
});

var small = new Loaner({
  serial : null,
  model : null,
  type : null,
  owners : [{ handle: null, user_name : null, password : null, checkin :  null, checkout : null }],
  date_modified: { created_at: null, modified: null  },
  age : null,
  qr : null,
  reset : false,
  expired : false
});

console.log(small);
// get one user
router.get( '/test', () => {
  small.getSerial()
});

router.get( '/ok', function () {
  console.log("ok");
});

router.get( '/update', function () {
  var serial_new = "other"
  small.updateSerial(serial_new)
  console.log("Updated!");
});

router.get( '/make', function (err, kittens) {
  var serial_new = "other"
  small.updateSerial(serial_new)
  small.save( function (err) {
    if (err) return handleError(err);
    console.log("saved");
  })
});

router.get( '/change', function (err, kittens) {
  Loaner.find({serial: "java"}, function (err, small) {
    // small[0].updateSerial("teakopp")
    // small[0].save()
    console.log(small);
  })
});

// add one new user
router.post( '/');

module.exports = router;
