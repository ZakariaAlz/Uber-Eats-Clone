const { model, Schema } = require('mongoose')

const RestaurantSchema = new Schema({

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
  adress: {
    type: String,
    required: true,
  },
  referralCodeused: {
    type: String,
    required: true,
  },
  referralCodeowned: {
    type: String,
    required: true,
  },
  state:{
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }

});

module.exports = model('Restaurant', RestaurantSchema, 'restaurants');