var fs = require('fs'),
  path = require('path'),
  exec = require('child_process').exec,
  express = require('express'),
  ngrok = require('ngrok'),
  bodyParser = require('body-parser')

var app = module.exports = express();

app.use(bodyParser());
// The static middleware must come after the sass middleware
app.use(express.static( path.join( __dirname, 'src' ) ) );

ngrok.connect({
  authtoken: process.env.NGROK_AUTH_TOKEN,
  subdomain: 'piplot',
  port: process.env.PORT || 4000
}, function(err, url) {
  console.log('Connecting to ngrok failed:', err, url)
});

app.get('/', function(req, res) {
  res.sendfile('src/index.html');
});

app.post('/plot', function(req, res) {
  fs.writeFile('/tmp/plot.svg', req.body.svg, function(err) {
    if (err) {
      console.log(err);
    } else {
      inkscape = exec('inkscape -P /tmp/plot.ps /tmp/plot.svg', function(err, stdout, stderr) {
        console.log('inkscape stdout:', stdout);
        console.log('inkscape stderr:', stderr);
        if (err)
          console.log('inkscape failed with', err);
        else
          exec('cat /tmp/plot.ps | graphtecprint', function(err, stdout, stderr) {
            console.log('graphtecprint stdout:', stdout);
            console.log('graphtecprint stderr:', stderr);
            if (err)
              console.log('graphtecprint failed with', err);
          });
      });
    }
  });
});

app.listen(process.env.PORT || 4000);
