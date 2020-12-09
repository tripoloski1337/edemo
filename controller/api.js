const user_data = require("../model/users");
const ruu_data = require("../model/ruu");
const config = require("../config/env");
const jwt = require("jsonwebtoken");
const exJwt = require("express-jwt");
const { Schema } = require("mongoose");
var crypto  = require("crypto");

exports.Index = function(req , res , next){
    res.json({msg:"hello world"});
}

exports.Login = function(req, res, next){
    let nik = req.body.nik;
    user_data.find({nik: nik}, function(err, data){
        if(err) throw err;
        if(data.length > 0){
            const token = jwt.sign({
                id:data[0]._id, 
                nik:data[0].nik, 
                nama: data[0].nama
            }, config.KEY_PASS , {expiresIn: 129600});
            console.log(data);
            res.json({msg:"authenticated", token:token , username:data[0].nama , email:data[0].nik});
        }else{
            res.json({msg:"fail"});
        }
    });
}

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

exports.vote = function(req, res, next){
    // let 
}

