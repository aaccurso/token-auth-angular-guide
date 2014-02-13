var express     = require('express');
var jwt         = require('jsonwebtoken');
var expressJwt  = require('express-jwt');

var app = express();

var secret = 'shhh secret';

app.use(express.logger());
app.use(express.json({strict: true}));

app.use('/', express.static('/' + __dirname));

app.post('/authenticate', function (req, res) {

});

app.listen(1337);
