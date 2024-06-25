const {model, Schema} = require('mongoose')

const TechnicalSchema = new Schema({

  sqlId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    min: 2,
    max: 20
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  phonenumber: {
    type: String,
    required: true,
    unique: true
    },
  created_at:{
    type: Date,
    default: Date.now
  },
  updated_at:{
    type: Date,
    default: Date.now
  }

});

module.exports = model('Technical', TechnicalSchema,'technicals');