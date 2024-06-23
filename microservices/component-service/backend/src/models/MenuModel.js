const { model, Schema } = require('mongoose')
const MenuSchema = new Schema({
  titre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant' // Reference to the Client model
},
  articles: [{
    article: {
      type: Schema.Types.ObjectId,
      ref: 'Article' // Reference to the Article model
    },
    designation: String,
    categorie: String,
    quantite: Number,
  }],
  prix: {
    type: Number,
    required: false
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

module.exports = model('Menu', MenuSchema, 'menus');