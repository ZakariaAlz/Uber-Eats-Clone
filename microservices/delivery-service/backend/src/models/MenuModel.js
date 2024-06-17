const { model, Schema } = require('mongoose')

const MenuSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  articles: [{
    article: {
      type: Schema.Types.ObjectId,
      ref: 'Article' // Reference to the Article model
    },
    name: String,
    quantity: Number,
    price: Number,
    totalprice: Number
  }],
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant' // Reference to the Restaurant model
  },
  price: {
    type: Number,
    required: true
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