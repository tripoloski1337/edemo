const mongoose    = require('mongoose');
const crypto      = require("crypto");
const user        = require("../model/users");
const config      = require("../config/env"); 

mongoose.Promise = global.Promise;
var connect      = "mongodb://localhost/" + config.MongoDBname;
var options      = {server: {socketOptions : {keepAlive: 1}}};

mongoose.connect(connect , options);
user.find({nik:"123456789"} , function(err , data){
    if(data.length == 0){
        var data = new user({
            nik: "123456789",
            nama: "Muhammad Arsalan Diponegoro",
            alamat: "Simprug Golf 3 Jakarta Pusat",
            kelamin: "Pria",
            pekerjaan: "Mahasiswa",
        });
        data.save(function(err){
            if(err) throw err;
            console.log("user data created..");
        })
    }
})
