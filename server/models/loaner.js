var mongoose = require('mongoose');

var LoanerSchema = new mongoose.Schema({
  serial : String,
  model : String,
  type : String,
  owners : [{ handle: String, user_name : String, password : String, checkin :  String }],
  created_at: String,
  modified: String,
  checkout : String,
  age : Number,
  qr : String,
  reset : Boolean,
  expired : Boolean
});

LoanerSchema.methods.getSerial = function () {
  console.log(this.serial);
}

LoanerSchema.methods.updateSerial = function (new_serial) {
  console.log(this.serial);
  this.serial = new_serial
  console.log(this.serial);
}

LoanerSchema.methods.setOwners = function (handle, user_name, password, checkout) {
  var hours = new Date(Date.now()).toLocaleString();

  dict = {}
  dict["handle"] = handle
  dict["user_name"] = user_name
  dict["password"] = password
  dict["checkin"] = hours
  this.owners[0] = dict
}

LoanerSchema.methods.setSerial = function (serial) {
  this.serial = serial
}

LoanerSchema.methods.setCheckout = function (checkout) {
  this.checkout = checkout
}

LoanerSchema.methods.setModel = function (model) {
  this.model = model
}

LoanerSchema.methods.setType = function (type) {
  this.type = type
}

LoanerSchema.methods.setDateMod = function () {
  var hours = new Date(Date.now()).toLocaleString();
  this.created_at = hours
  this.modified = hours
}

Loaner = mongoose.model('Loaner', LoanerSchema);
module.exports = Loaner
