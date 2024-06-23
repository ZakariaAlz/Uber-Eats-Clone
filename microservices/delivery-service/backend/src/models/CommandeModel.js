const { model, Schema } = require('mongoose')

const CommandeSchema = new Schema({

    numero: {
        type: String,
        required: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client' // Reference to the Client model
    },
    livreur: {
        type: Schema.Types.ObjectId,
        ref: 'Livreur' // Reference to the Client model
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
        prix: Number,
        prixt: Number,
    }],
    menus: [{
        menu: {
            type: Schema.Types.ObjectId,
            ref: 'Menu' // Reference to the Article model
        },
        prix: Number,
        prixt: Number,
    }],
    prixtotal: {
        type: String,
        required: true
    },
    etat: {
        type: String,
        required: true
    },
    datelivraison: {
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