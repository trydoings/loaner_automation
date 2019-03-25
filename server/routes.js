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
function addUser(handle, user_name, password, checkout, serial){
  var hours = new Date(Date.now()).toLocaleString();
  var data = { handle: handle, user_name : user_name, password : password, checkin :  hours, checkout : checkout }
  loaners.updateOne(
    { serial: serial },
    { $push: { owners: data } },
    function (error, success) {
       if (error) {console.log(error);} else {console.log(success);}
     }
  );
  loaners.updateOne(
    { serial: serial },
    { $set: { modified: hours } },
    function (error, success) {
       if (error) {console.log(error);} else {console.log(success);}
     }
  );
}
function check_for_existing_entry(user_name, handle, password, serial, model, type){
  loaners.find({serial:serial}, function(err,data){
    if (!data[0]){
      console.log("Serial not found. Creating new object.");
      var new_object = new Loaner({});
      new_object.setSerial(serial)
      new_object.setModel(model)
      new_object.setType(type)
      new_object.setOwners(handle, user_name, password)
      new_object.setCheckout(handle)
      new_object.setDateMod()
      actualize_object(new_object)
    } else {
      serial = data[0].serial
      console.log(serial,": serial already exists use /find.");
      addUser(handle, user_name, password, "then", serial)
    }
  })
}

router.get( '/test', (req,res) => {
  console.log("test");
  res.send("test")
});
router.get( '/ok', function (req,res) {
  console.log("ok");
  res.send("ok")
});
router.get( '/find', function (req, res) {
  console.log(req.query);
  loaners.find({ serial: req.query['q']}, function (err, data) { (data.length > 0) ? res.send(data) : res.send("not found");});
});
router.get( '/checkedout', function (req, res) {
  console.log(req.query);
  loaners.find({ serial: req.query['q']}, function (err, data) { (data.length > 0) ? res.send(data[0]['checkout']) : res.send("not found");});
});

router.get( '/checkedoutlast', function (req, res) {
  console.log(req.query);
  loaners.find({ serial: req.query['q']}, function (err, data) {
    (data.length > 0) ? res.send(data[0]['owners'][data[0]['owners'].length-1]['handle']) : res.send("not found");
  });
});

router.get( '/checkedoutdate', function (req, res) {
  console.log(req.query);
  loaners.find({ serial: req.query['q']}, function (err, data) {
    (data.length > 0) ? res.send(data[0]['owners'][data[0]['owners'].length-1]['checkin']) : res.send("not found");
  });
});
router.get( '/checkin', function (req, res) {
  serial=req.query['q']
  loaners.find({ serial: serial}, function (err, data) { (data.length > 0) ? console.log("checked in:",data[0]['checkout']) : console.log("not found");});
  loaners.updateOne(
    { serial: serial },
    { $set: { checkout: "checked in" } },
    function (error, success) {
       if (error) {console.log("error",error);} else {console.log("success",success);}
     }
  );
  loaners.find({ serial: serial}, function (err, data) {
    (data.length > 0) ? res.send(data[0]['checkout']) : res.send("not found");});
});
router.get( '/checkout', function (req, res) {
  serial=req.query['q']

  loaners.find({ serial: serial}, function (err, data) {
    (data.length > 0) ? console.log("checked in:",data[0]['checkout']) : console.log("not found");
    len=data[0]['owners'].length
    handle=data[0]['owners'][len-1]['handle']
    console.log(handle);
    loaners.updateOne(
      { serial: serial },
      { $set: { checkout: handle } },
      function (error, success) {
         if (error) {console.log("error",error);} else {console.log("success",success);}
       }
    );
  });
  loaners.find({ serial: serial}, function (err, data) { (data.length > 0) ? res.send(data[0]['checkout']) : res.send("not found");});
});
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

module.exports = router;
