const {model, Schema} = require('mongoose')

const ArticleSchema = new Schema({

  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant' // Reference to the Restaurant model
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

module.exports = model('Article', ArticleSchema,'articles');