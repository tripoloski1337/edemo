let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let x = new Schema({
    nik: {type:String , required:true , unique:true},
    nama: {type:String , required:true},
    alamat: {type:String , required:true},
    kelamin: {type:String , required:true},
    pekerjaan: {type:String , required:true},
    
},{
    timestamps:true
});
var data_users = mongoose.model("data_users",x);
module.exports = data_users;