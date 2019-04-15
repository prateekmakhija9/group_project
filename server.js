var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var jsonParser = bodyParser.json()
//Create Database Connection
var pgp = require('pg-promise')();
app.use(express.static(__dirname + '/'));

/**********************
  Database Connection information
  host: This defines the ip address of the server hosting our database.  We'll be using localhost and run our database on our local machine (i.e. can't be access via the Internet)
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.  From our previous lab, we created the football_db database, which holds our football data tables
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database.  You'll need to set a password USING THE PSQL TERMINAL THIS IS NOT A PASSWORD FOR POSTGRES USER ACCOUNT IN LINUX!
**********************/
// const dbConfig = {
// 	host: 'localhost',
// 	port: 5432,
// 	database: 'meetnwork_db',
// 	user: 'postgres',
// 	password: '1234'
// };

// var db = pgp(dbConfig);
app.get('/', function(req,res){
	res.sendFile(__dirname+'/homepage.html');
});

app.get('/myprofile', function(req,res){
	res.sendFile(__dirname+'/Profile_Page(Edit).html');

});

app.get('/profile', function(req,res){
	res.sendFile(__dirname+'/profile_page(public).html')
});

app.get('/login', function(req,res){
	res.sendFile(__dirname+'/Login_Page.html');

});

app.get('/newuser', function(req,res){

	res.sendFile(__dirname +'/Reg_page.html');
});

app.post('/retrieve',jsonParser ,function (req, res, next) {	
	// Ideally you would be using your data base insert statement here
	console.log('user info gathered');
	console.log(req.body.username_id);
	console.log(req.body.email_id);
	console.log(req.body.password_id);
	var insertLoginTable= 'INSERT INTO login_table(user_name,user_email,user_password) VALUES('
	+req.body.username_id+','+req.body.email_id+','+req.body.password_id+');'
	res.status(200).send("success");

})








app.listen(3000);
console.log('3000 is the magic port');
