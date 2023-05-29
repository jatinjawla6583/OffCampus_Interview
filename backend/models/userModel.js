// const mongoose = require('../connection');

const { Types } = require('mongoose');
const {Schema, model} = require('../connection');     //import connection.js file
// importing schema and model from mongoose framework


const mySchema = new Schema({
    name : String,
    email : {type: String, unique: true},
    password : String,
    createdAt : Date,
    verified: {type: Boolean, default: false},
})


module.exports = model('users', mySchema);                           //users is name of Collection






