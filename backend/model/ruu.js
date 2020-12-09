let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let x = new Schema({
    nama: {type:String , required:true , unique:true},
    pasal: {type:String , required:true },
    deskripsi: {type:String , required:true},
    due_date: {type:String, required:true},
    count: {type:String, required:true},
    link: {type:String, required:true},
},{
    timestamps:true
});
var ruus = mongoose.model("ruu",x);
module.exports = ruus;