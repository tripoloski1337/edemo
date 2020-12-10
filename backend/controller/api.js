const user_data = require("../model/users");
const ruu_data = require("../model/ruu");
const vote_data = require("../model/vote");
const config = require("../config/env");
const jwt = require("jsonwebtoken");
const exJwt = require("express-jwt");
const { Schema } = require("mongoose");
var crypto  = require("crypto");
const data_users = require("../model/users");


exports.Index = function(req , res , next){
    res.json({msg:"hello world"});
}

// exports.Login = function(req, res, next){
//     let nik = req.body.nik;
//     user_data.find({nik: nik}, function(err, data){
//         if(err) throw err;
//         if(data.length > 0){
//             const token = jwt.sign({
//                 id:data[0]._id, 
//                 nik:data[0].nik, 
//                 nama: data[0].nama
//             }, config.KEY_PASS , {expiresIn: 129600});
//             console.log(data);
//             res.json({msg:"authenticated", token:token , username:data[0].nama , email:data[0].nik});
//         }else{
//             res.json({msg:"fail"});
//         }
//     });
// }

exports.list_ruus = function(req, res, next){
    ruu_data.find({}, function(err, data){
        res.json({data: data});
    })
}

exports.detail_ruu = function(req, res, next){
    let id = req.params.id;
    ruu_data.find({_id: id}, function(err, data){
        if(err) throw err;
        res.json({data: data});
    })
}

exports.voting = function(req, res, next){
    let nik = req.body.nik;
    let ruuid = req.params.ruuid; 
    let voted = req.body.voted;

    user_data.find({nik:nik}, function(err, data1){
        if(err) throw err;
        vote_data.find({nik:nik}, function(err2, data2){
            if(err) throw err; 
            if(data2.length > 0){
                res.json({msg:"fail"});
            }else if(data1.length == 1 ){
                var x = new vote_data({
                    nik: nik,
                    id_ruu:ruuid,
                    vote:voted
                });
                x.save(function(err){
                    if(err) throw err;
                    res.json({msg:"oke"});
                })
            }else{
                res.json({msg:"fail"});
            }
        })
    })
}

exports.count_y_by_id = function(req, res, next){
    let id = req.params.id;
    // console.log(id);
    vote_data.find({id_ruu:id, vote:"y"}, function(err, data){
        if(err) throw err;
        res.json({count: data.length});
    });
}

exports.count_n_by_id = function(req, res, next){
    let id = req.params.id;
    vote_data.find({id_ruu:id, vote:"n"}, function(err, data){
        if(err) throw err;
        res.json({count: data.length});
    });
}