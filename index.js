var express = require('express');
var app = express();
var multer = require('multer');
var upload = multer();
var things = require('./things.js');
var bodyParser = require('body-parser');
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'))

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
// form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));
app.get('/', function(req, res){
	res.render("homepage");
})
app.get('/signup', function(req, res){
	res.render('signup')
});

app.post('/signup', function(req, res){
   // localStorage.setItem('message', req.body)
   res.send("recieved your request!");
});

app.get('/signin', function(req, res){
	res.render('signin')
});

app.post('/signin', function(req, res){
console.log('local storage ', localStorage)
   localStorage.setItem('user', req.body)
   console.log(localStorage.getItem('user'))
   res.send("recieved your request!");
});



app.post('/profile', function(req, res){
   // localStorage.setItem('message', req.body)
   res.send("recieved profile request!");
});

app.get('/doge', function(req, res){
	res.render('image')
});

app.get('/first_template', function(req, res){
	res.render('first_view')
});

app.get('/profile', function(req, res){
	res.render('profile', {
		user: {username: 'Gideon', password: '21', location:"Rolla"}
	});
});

app.get('/components', function(req, res){
	res.render('content');
});
// //To parse URL encoded data
// app.use(bodyParser.urlencoded({ extended: false }))

// //To parse json data
// app.use(bodyParser.json())

app.use(function(req, res, next){
	console.log("A new request recieved at " + Date.now());
	next();
});

app.get('/hello', function(req, res){
   res.send("Hello World!");
});

app.post('/hello', function(req, res){
   res.send("You just called the post method at '/hello'!\n");
});

//both index.js and things.js should be in same directory
app.use('/things', things);


app.all('/test', function(req, res){
	console.log('Please work')
	localStorage.setItem('MyKey', 'My Value!')
	console.log(localStorage.getItem('MyKey'))
	res.send("Catching all HTTP methods from test!")
});

app.get('*', function (req, res){
	res.send('404 Not Found. URL does not match any valid path.');
});

port = 3000
console.log('Listening on port ' + port.toString())
app.listen(port);
