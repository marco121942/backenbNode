var express = require('express');
var sql = require('mssql');
var app = express();
var bodyParser = require("body-parser");
var SQLSP = require('sqlstoreprocedure')
//Convierte la data en Json para poder trabajarlo
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());
//Inicializando la aplicación
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
	console.log("Aplicación saliendo por el puerto : ", port);
 });
 //Cors
 app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

 //conectando ala base de datos rh_meteorologia para consumir el proceso almacenado



app.get('/', function (req, res) {
const sp = new SQLSP('marco', '192.168.1.50', 'VISAM_GRH_BNV_1_1', 'Marco2019!!');
//Consumientio el proceso almacenado SumaRainAVGTempOut
sp.exec('SumaRainAVGTempOut').then((response) => {
    
   // console.log(response);
    res.send(response);

}).catch((error) => {
    console.log(`SP Error: ${error}`);
})

});

 //conectando ala base de datos rh_meteorologia

 var config = {
    user: 'marco',
    password: 'Marco2019!!',
    server: '192.168.1.50', 
    database: 'VISAM_GRH_BNV_1_1' 
};

var connection = sql.connect(config,function(err,res){
    if(err){
        throw err;
        console.log("Error al conectarse ala base de datos");


    }else{
        console.log("Conectado ala base de datos rh_meteorologia")

    }

})