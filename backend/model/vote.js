let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let x = new Schema({
    nik: {type:String , required:true , unique:true},
    id_ruu: {type:String , required:true},
    vote: {type:String , required:true}, // must be between y or no
},{
    timestamps:true
});
var data_users = mongoose.model("data_vote",x);
module.exports = data_users;