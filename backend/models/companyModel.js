
const { Schema, model } = require('../connection');

const mySchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  createdAt: Date,
  verified: { type: Boolean, default: false }
});

module.exports = model('company', mySchema); //users is name of Collection
