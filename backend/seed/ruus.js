const mongoose    = require('mongoose');
const crypto      = require("crypto");
const user        = require("../model/ruu");
const config      = require("../config/env"); 

mongoose.Promise = global.Promise;
var connect      = "mongodb://localhost/" + config.MongoDBname;
var options      = {server: {socketOptions : {keepAlive: 1}}};

mongoose.connect(connect , options);
user.find({nama:"OMNI BUS LAW"} , function(err , data){
    if(data.length == 0){
        var data = new user({
            nama: "OMNI BUS LAW",
            pasal: "pasal 20 ayat 999",
            deskripsi: "tentang ke tenaga kerjaan",
            due_date: "12-12-2020",
            count: "0",
            link: "http://tripoloski1337.github.io",
        });
        data.save(function(err){
            if(err) throw err;
            console.log("user data created..");
        })
    }
})
