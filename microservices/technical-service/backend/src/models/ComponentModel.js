const {model, Schema} = require('mongoose')

const ComponentSchema = new Schema({

  name: {
    type: String,
    required: false,
  },
  code: {
    type: String,
    required: false,
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

module.exports = model('Component', ComponentSchema,'components');