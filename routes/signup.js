var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    var user =  req.session.user,
	   userId = req.session.userId;
	   console.log('ddd='+userId);
	   if(userId == null){
	   		res.render('signup');
	      	return;
	   }

	   var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";

	   db.query(sql, function(err, results){
	      res.redirect("/");  
	   });
});
router.post('/signup/sign_up', function(req, res, next) {
  message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
      var fname= post.first_name;
      var lname= post.last_name;
      var mob= post.mob_no;

      var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "')";

      var query = db.query(sql, function(err, result) {

         message = "Succesfully! Your account has been created.";
         res.redirect("/");
      });

   } else {
      res.render('signup');
   }
});

module.exports = router;

