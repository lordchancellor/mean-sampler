const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
});

schema.plugin(validator);

module.exports = mongoose.model('User', schema);