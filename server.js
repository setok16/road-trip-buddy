var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create();
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(express.static(__dirname + '/public'));

var mysql = require('./dbcon.js');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 9477);

app.use(session({secret:'supersecret'}));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

/**************INDEX PAGE******************/
app.get('/', function(req,res,next){
	res.render('home');
});

/**************SIGNUP PAGE******************/
app.get('/signup', function(req,res,next){
	res.render('signup');
});

/**************LANDING PAGE******************/
app.get('/landing', function(req,res,next){
	if (req.session.name){
		res.render('landing'); //if the user has a session, direct to landing
	}
	else {
		res.redirect('/'); //if the user doesn't have a session, redirect to login page
	}
});

/**************AUTHENTICATE USER/PASS******************/
app.post('/authenticate',function(req,res,next){
  var pass = req.body.password;

  mysql.pool.query('SELECT user_nm, password FROM users WHERE user_nm = ?', [req.body.user_nm], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }

  var authPass = rows;

  if (authPass[0] !== undefined){
	  if(pass === authPass[0].password){
		req.session.name = authPass[0].user_nm;
		req.session.save();
	    res.status(200).send();
	  } 
	  else{
	  	res.status(445).send();
	  } 	
  }
  else{
    res.status(445).send();
  }
  });

});

/**************CREATE NEW USER******************/
app.post('/add_user', function(req,res,next){
	mysql.pool.query("INSERT INTO users (`user_nm`,`password`,`user_email`) VALUES (?,?,?)",
	[req.body.user_nm, req.body.password, req.body.user_email],
	function(err, result){
		if(err){
			next(err);
			return;
		}
	});

	res.send();
});

/************RUN THE APP******************/
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

