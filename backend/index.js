const express = require("express");
const app = express();
const server  = require("http").createServer(app);
const bodyParser = require("body-parser");
const logger = require("morgan");
const methodOverride = require("method-override");
const createError = require("http-errors");
const mongoose = require("mongoose");
const config = require("./config/env");

/* NoSQL connection */
mongoose.connect('mongodb://'+ config.MongoHost +'/' + config.MongoDBname,{useNewUrlParser: true , useUnifiedTopology: true, server : { socketOptions: { keepAlive: 1 }}});


let apis = require("./routes/api.js");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(logger("dev"));
app.use(methodOverride(function(req , res){
	if(req.body && typeof req.body == "object" && "_method" in req.body){
		let method = req.body._method;
		delete req.body._method;
		return method;
	}
}));

/* enable cors */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept , Authorization");
    next();
  });


app.use("/",apis);
app.use(function(req , res , next){
	next(createError(404))
})
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') { 
        res.status(401).send(err);
    }
    else {
        next(err);
    }
});

/* create connection */
server.listen(config.Port , function(){
    console.log("hello world , bismillah :)");
})

module.exports = app;
