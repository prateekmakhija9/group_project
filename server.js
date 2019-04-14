var express = require('express'); 
var app = express();
var bodyParser = require('body-parser'); 
app.use(bodyParser.json());              
app.use(bodyParser.urlencoded({ extended: true })); 
var pgp = require('pg-promise')();
const dbConfig = {// this imformation is from lab7, and we need to add our own imformation
	host: 'localhost',
	port: 5432,
	database: 'football_db',
	user: 'postgres',
	password: ''
};

var db = pgp(dbConfig);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));
app.post('/regester',function(req,res)){//the post of regester page
var user_name=req.body.user_name;
var user_email=req.body.user_email;
var user_password=req.body.user_password;
var user_first_name=req.body.user_first_name;
var user_last_name=req.body.user_last_name;
var major=req.body.M_choice;
var year=req.body.Y_choice;
var class=req.body.C_choice;
var login_info="INSERT INTO login_table(user_name, user_email, user_password)VALUES('" + user_name + "','" + user_email + "','" + user_password +"') ON CONFLICT DO NOTHING;";
var user_info="INSERT INTO user_table(first_name, last_name, major, year, classes, status)VALUES('" + user_first_name + "','" + user_last_name + "') ON CONFLICT DO NOTHING;";
// the var user_info is uncompleted because we lack of year, major ,and class

db.task('get-everything', task =>{
	return task.batch([
	task.any(login_info),
	task.any(user_info)
	]);
})
   .then(info =>{
	   res.render('/regester',{
		   my_title: "regester page",
		   //uncompleted
	   })
   })
   .catch(error =>{
	   request.flash('error, err');
	   response.render('/regester',{
		   my_title:'regester page',
		   //uncompleted
	   })
   })
}
app.get('/logpage',function(req,res){
	var user_id=req.body.user_name;
	var user_password=req.body.user_password;
	var login ="select * from login_table where user_name='"+user_id+"'";
	db.any(login).then(function(/*what function we should use?*/){
		res.render('/logpage',{
			title:'log in page',
			//uncompleted
		})
	})
	.catch(function(err){
		request.flash('error',err);
		response.render('/logpage',{
			title:'log in page',
			//not complete
		})
	})
})

