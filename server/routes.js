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

function parse_query(query){
  var temp = ''
  var total_obj = []
  var dict = {}
  var prev = ''
  var stay = 0
  var obj = query.new_user+=','

  for(i = 0; i < obj.length; i++){
    if (obj[i] === ','){
      total_obj.push(temp)
      temp = ''
    } else {
      temp += obj[i]
    }
  }
  //console.log(total_obj);
  return total_obj
}

router.put( '/make', (req, res, kittens) => {
  obj_val=parse_query(req.query)
  console.log(obj_val);

  var user_name = obj_val[0]
  var handle = obj_val[1]
  var password = obj_val[2]
  var serial = obj_val[4]

  small.setOwners(handle, user_name, password, "then")
  small.setSerial(serial)
  small.setModel("15 MacBook Pro")
  small.setType("Computer")
  small.setDateMod()

  console.log(small);

  small.save( function (err) {
    if (err){
      if(err.code === 11000) {
          error = 'That email is already taken, try another.';
        } else {
          console.log(err);
        }
    }
    console.log("saved");
  })
  res.send(small)
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
