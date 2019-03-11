var mongoose = require('mongoose');

var LoanerSchema = new mongoose.Schema({
  serial : String,
  model : String,
  type : String,
  owners : [{ handle: String, user_name : String, password : String, checkin :  Date, checkout : Date }],
  date_modified: { created_at: Date, modified: Date  },
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

Loaner = mongoose.model('Loaner', LoanerSchema);
module.exports = Loaner
