var express = require('express')
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var app = express()
var port = 3000
var database = 'test'

//will create database if one does not already exist
mongoose.connect(`mongodb://localhost:27017/${database}`, { useNewUrlParser: true });


var rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}

app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: function () { return true } }));

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/', function (req, res) {
  res.send('Got a POST request')
})

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
  console.log(req.rawBody);
  console.log("\nRequest data complete.");
})

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
