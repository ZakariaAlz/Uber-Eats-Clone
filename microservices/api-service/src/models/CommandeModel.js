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
        ref: 'Delivery' // Reference to the Client model
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
        quantity: Number,
        price: Number,
        totalprice: Number
    }],
    menus: [{
        menu: {
          type: Schema.Types.ObjectId,
          ref: 'Menu' // Reference to the Article model
        },
        name: String,
        quantity: Number,
        price: Number,
        totalprice: Number
      }],
    totalprice: {
        type: Number,
        required: true
    },
    versement: {
        type: Number,
    },
    status: {
        type: String,
        required: true
    },
    deleverydate: {
        type: String,
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

module.exports = model('Commande', CommandeSchema, 'commandes');