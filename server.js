var express = require('express'); 
var app = express();
var bodyParser = require('body-parser'); 
app.use(bodyParser.json());              
app.use(bodyParser.urlencoded({ extended: true }));

var pgp = require('pg-promise')();

const dbConfig = {// this imformation is from lab7, and we need to add our own imformation
	host: 'localhost',
	port: 5432,
	database: 'meetnwork_db',
	user: 'postgres',
	password: 'user'
};
// const dbConfig = process.env.DATABASE_URL; //can replace who dbConfig above with this

var db = pgp(dbConfig);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

// app.post('/register',function(req,res)){//the post of register page
// 	var user_name=req.body.user_name;
// 	var user_email=req.body.user_email;
// 	var user_password=req.body.user_password;
// 	var user_first_name=req.body.user_first_name;
// 	var user_last_name=req.body.user_last_name;
// 	var major=req.body.M_choice;
// 	var year=req.body.Y_choice;
// 	var class=req.body.C_choice;
// 	var login_info="INSERT INTO login_table(user_name, user_email, user_password)VALUES('" + user_name + "','" + user_email + "','" + user_password +"') ON CONFLICT DO NOTHING;";
// 	var user_info="INSERT INTO user_table(first_name, last_name, major, year, classes, status)VALUES('" + user_first_name + "','" + user_last_name + "') ON CONFLICT DO NOTHING;";
// 	// the var user_info is uncompleted because we lack of year, major ,and class

// 	db.task('get-everything', task =>{
// 		return task.batch([
// 		task.any(login_info),
// 		task.any(user_info)
// 		]);
// 	})
//    .then(info =>{
// 	   res.render('/register',{
// 		   my_title: "register page",
// 		   //uncompleted
// 	   })
//    })
//    .catch(error =>{
// 	   request.flash('error, err');
// 	   response.render('/register',{
// 		   my_title:'register page',
// 		   //uncompleted
// 	   })
//    })
// }

// app.get('/logpage',function(req,res){
// 	var user_id=req.body.user_name;
// 	var user_password=req.body.user_password;
// 	var login ="select * from login_table where user_name='"+user_id+"'";
// 	db.any(login).then(function(/*what function we should use?*/){
// 		res.render('/logpage',{
// 			title:'log in page',
// 			//uncompleted
// 		})
// 	})
// 	.catch(function(err){
// 		request.flash('error',err);
// 		response.render('/logpage',{
// 			title:'log in page',
// 			//not complete
// 		})
// 	})
// })


// login page 
app.get('/', function(req, res) {
	res.render('pages/login',{
		local_css:"signin.css", 
		my_title:"Login Page"
	});
});
// registration page 
app.get('/register', function(req, res) {
	res.render('pages/register',{
		my_title:"Registration Page"
	});
});

// profile page
app.get('/profile', function(req, res) {
	res.render('pages/profile',{
		my_title:"Profile Page"
	});
});

//edit profile page
app.get('/profile_edit', function(req, res) {
	res.render('pages/profile_edit',{
		my_title:"Edit Profile Page"
	});
});

// home page

app.get('/home', function(req, res) {
	var query = 'select classes from user_table ';
	query += "WHERE first_name = 'Elizabeth';";
	console.log(query);

	db.any(query)
    .then(function (rows) {
    	console.log(rows)
        res.render('pages/home',{
			my_title: 'Home Page',
			data: rows
		})

    })
    .catch(function (err) {
        // display error message in case an error
        request.flash('error', err);
        response.render('pages/home', {
            title: 'Home Page',
            data: ''
        })
    });
	
});

app.listen(3000);
console.log('3000 is the magic port');