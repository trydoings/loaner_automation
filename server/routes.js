var express = require('express');
var router = express.Router();
var loaners = require('./models/loaner.js');
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we're connected!");
});

// get one user
router.get( '/test', (req,res) => {
  console.log("test");
  res.send("test")
});

router.get( '/ok', function () {
  console.log("ok");
});


router.get( '/find', function (req, res) {
  loaners.find({ serial: req.query['serial']}, function (err, data) { (data.length > 0) ? res.send(data) : res.send("not found");});
});



function parse_query(query){
  var temp = ''
  var total_obj = []
  var obj = query.new_user+=','

  for(i = 0; i < obj.length; i++){
    if (obj[i] === ','){
      total_obj.push(temp)
      temp = ''
    } else {
      temp += obj[i]
    }
  }
  console.log(total_obj);
  return total_obj
}

function actualize_object(new_object){
  if (new_object){
    new_object.save( function (err) {
      if (err){
        if(err.code === 11000) {
            error = 'Entry already exist -- consider renaming it. ';
          } else {
            console.log(err);
          }
      }
      console.log("saved");
    })
    console.log(new_object);
  }
}

function check_for_existing_entry(user_name, handle, password, serial, model, type){
  loaners.find({serial:serial}, function(err,data){
    if (!data[0]){
      console.log("Serial not found. Creating new object.");
      var new_object = new Loaner({});
      new_object.setSerial(serial)
      new_object.setModel(model)
      new_object.setType(type)
      new_object.setOwners(handle, user_name, password, "then")
      new_object.setDateMod()
      actualize_object(new_object)
    } else {
      serial = data[0].serial
      console.log(serial,": serial already exists use /find.");
    }
  })
}

router.put( '/make', (req, res, kittens) => {
  obj_val=parse_query(req.query)
  console.log(obj_val);
  var user_name = obj_val[0]
  var handle = obj_val[1]
  var password = obj_val[2]
  var serial = obj_val[4]
  var model = obj_val[5]
  var type = obj_val[6]
  check_for_existing_entry(user_name, handle, password, serial, model, type)
  res.send("Creation complete. Check logs for errors.")

});

router.get( '/change', function (err, loaners, handle, user_name, password, checkin, checkout) {

  var data = {handle: handle, user_name : user_name, password : password, checkin :  checkin, checkout : checkout }

  Loaner.update(
    { serial: "java" },
    { $push: { owners: thing } },
    function (error, success) {
       if (error) {
           console.log(error);
       } else {
           console.log(success);
       }
     }
  );
});

module.exports = router;
