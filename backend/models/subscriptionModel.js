
const {Schema, model, Types} = require('../connection');     //import connection.js file
// importing schema and model from mongoose framework


const mySchema = new Schema({
    user : {type: Types.ObjectId, ref: 'users'},
    company : {type: Types.ObjectId, ref: 'company'},
    createdAt : Date,
})


module.exports = model('subscription', mySchema);                           //users is name of Collection






