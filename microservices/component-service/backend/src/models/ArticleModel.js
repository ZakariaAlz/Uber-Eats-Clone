const {model, Schema} = require('mongoose')

const ArticleSchema = new Schema({

  designation: {
    type: String,
    required: true,
  },
  categorie: {
    type: String,
    required: true,
  },
  quantite: {
    type: Number,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
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