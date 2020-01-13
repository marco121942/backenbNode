var express = require('express');
var app = express();

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'marco',
        password: 'Marco2019!!',
        server: '192.168.1.50', 
        database: 'VISAM_GRH_BNV_1_1' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);
        else{
            console.log("Se conecto ala base de datos");
        }

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select Rain from rh_meteorologia where station_id = 2', function (err, recordset) {
            

            
            if (err) console.log(err)

            // send records as a response
			res.send(recordset);
			console.log(recordset);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});