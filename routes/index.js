var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    // res.render('index');
    // res.render('index', { title: 'Express' });
  	var user =  req.session.user,
	   userId = req.session.userId;
	   console.log('ddd='+userId);
	   if(userId == null){
	      res.redirect("/login");
	      return;
	   }

	   var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";

	   db.query(sql, function(err, results){
	      res.render('index');    
	   });
});
router.get('/login', function(req, res, next) {
    var user =  req.session.user,
	   userId = req.session.userId;
	   console.log('ddd='+userId);
	   if(userId == null){
	   		res.render('login');
	      	return;
	   }

	   var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";

	   db.query(sql, function(err, results){
	      res.redirect("/");  
	   });
});
router.post('/login/sign_in', function(req, res, next) {
    var message = '';
   	var sess = req.session; 
   	if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
      console.log(name);
     
      var sql="SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";                           
      db.query(sql, function(err, results){   
         if(results.length){
         	console.log(results);
            req.session.userId = results[0].id;
            req.session.user = results[0];
            console.log(results[0].id);
            res.redirect('/');
            console.log(results);
         }
         else{
            message = 'Wrong Credentials.';
            res.render('login',{message: message});
         }
                 
      });
   } else {
      res.render('login',{message: message});
   }
});

module.exports = router;

