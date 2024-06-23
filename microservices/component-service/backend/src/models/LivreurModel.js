const { model, Schema } = require('mongoose')

const LivreurSchema = new Schema({
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
    tel: {
        type: String,
        required: true,
        unique: true
    },
    vehicleDetails: {
        type: String,
    },
    referralcodeowned: {
        type: String,
        required: true,
    },
    referralcodeused: {
        type: String,
        required: true,
    },
    id_livreur: {
        type: String,
        required: true,
        unique: true
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

module.exports = model('Livreur', LivreurSchema, 'livreurs');