var express     = require('express');
var jwt         = require('jsonwebtoken');
var expressJwt  = require('express-jwt');

var app = express();

var secret = 'shhh secret';

app.use(express.logger());
app.use(express.json({strict: true}));

app.use('/', express.static('/' + __dirname));

app.use('/api', expressJwt({secret: secret}));

app.post('/authenticate', function (req, res) {
  var user = req.body;
  var profile = {
    firstName: 'John',
    lastName: 'Doe',
    mail: 'john@doe.com',
    id: 1
  };

  if (!(user.user === 'john.doe' && user.password === '123456')) {
    res.send(401);
    return;
  }

  var token = jwt.sign(profile, secret, {expiresInMinutes: 60 * 5});
  res.send(200, {token: token});
});

app.listen(1337);
