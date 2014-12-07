var fs = require('fs');
var path = require('path');
var express = require('express')
var sassMiddleware = require('node-sass-middleware')
var bodyParser = require('body-parser')

var app = module.exports = express();

app.use(bodyParser());

// adding the sass middleware
app.use(
  sassMiddleware({
    src: __dirname + '/sass',
    dest: __dirname + '/src/css',
    debug: true,
  })
);

// The static middleware must come after the sass middleware
app.use(express.static( path.join( __dirname, 'src' ) ) );

app.get('/', function(req, res) {
  res.sendfile('src/index.html');
});

app.post('/plot', function(req, res) {
  console.log(req.body.svg);
});

app.listen(process.env.PORT || 4000);
