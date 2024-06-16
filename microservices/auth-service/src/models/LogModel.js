const { model, Schema } = require('mongoose')


const LogSchema = new Schema({
    value: {
        type: String,
        required: true,
    },
    type: {
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
},
);

const Log = mongoose.model('Log', LogSchema,'logs');

module.exports = Log;