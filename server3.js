//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();

// Setting Base directory
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
 var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
	console.log("Aplicación saliendo por el puerto : ", port);


 });

//Initiallising connection string

var dbConfig = {
    user: 'marco',
    password: 'Marco2019!!',
    server: '192.168.1.50', // You can use 'localhost\\instance' to connect to named instance
    database: 'VISAM_GRH_BNV_1_1',
 
    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
    }
//Function to connect to database and execute query
var  executeQuery = function(res, query){	
	sql.connect(dbConfig, function (res,err) {
	

		if (err) {   
			console.log("Error al comunicarse con la base de datos:- " + err);
			res.send(err);
		
		}	
		
		else {
			// create Request object
			var request = new sql.Request();
			// query to the database
			request.query(query, function (err, result) {
				if (err) {
					console.log("Error al realziar un query a una tabla:- " + err);
					res.send(err);
				}
				else {
					res.send(result);
				}
			});
		}

		
	});	
}

app.get("/", function(req , res){
	var query = "select * from rh_meteorologia";
	executeQuery (res, query);
	
	//res.send(query);
});
















//POST API
 app.post("/api/user ", function(req , res){
	var query = "INSERT INTO [Datos] (Name,Email,Password) VALUES (req.body.Name,req.body.Email,req.body.Password)";
	executeQuery (res, query);
});

//PUT API
 app.put("/api/user/:id", function(req , res){
	var query = "UPDATE [Datos] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
	executeQuery (res, query);
});

// DELETE API
 app.delete("/api/user /:id", function(req , res){
	var query = "DELETE FROM [Datos] WHERE Id=" + req.params.id;
	executeQuery (res, query);
});
