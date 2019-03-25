// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var useragent = require('express-useragent');
var acceptLanguage = require('accept-language');
var requestLanguage = require('express-request-language');
const requestIp = require('request-ip');


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
//Middleware for the useragent 
app.use(useragent.express());
//Middleware for the acceptlanguage
app.use(requestLanguage({
  languages: ['en-US', 'zh-CN']

}));
//Middleware for the requestIP
app.use(requestIp.mw())

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/whoami", function (req, res) {
  //Get the header language
  acceptLanguage.languages(['en-US', 'zh-CN'], ['en']);
  var lang = acceptLanguage.get('en-GB,en;q=0.5,sv');
  //Get the header IP
  const ip = req.clientIp;
  res.json({
    "ipaddress": ip, "language": lang,
    "software": req.useragent.source
  })
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
