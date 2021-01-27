const { strict } = require('assert');
const mongoose=require('mongoose');
const { stringify } = require('querystring');

const userSchema=mongoose.Schema({
    name:{
       type:String,
       required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('register',userSchema);