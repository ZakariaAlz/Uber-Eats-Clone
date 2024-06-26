const { model, Schema } = require('mongoose')

const CommandeSchema = new Schema({

    no: {
        type: String,
        required: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client' // Reference to the Client model
    },
    delivery: {
        type: Schema.Types.ObjectId,
        ref: 'Delivery', // Reference to the Client model
        required: false
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
        name: String,
        category: String,
        quantity: String,
        price: String,
        totalprice: Number
    }],
    menus: [{
        menu: {
          type: Schema.Types.ObjectId,
          ref: 'Menu' // Reference to the Article model
        },
        name: String,
        quantity: String,
        price: Number,
        totalprice: Number
      }],
    totalprice: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    deliverydate: {
        type: String,
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

module.exports = model('Commande', CommandeSchema, 'commandes');