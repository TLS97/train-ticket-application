const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    to: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    route: {
        type: Schema.Types.ObjectId,
        ref: 'SubRoute'
    },
    price: {
        type: Number,
        required: true,
        default: 100
    }
});

module.exports = mongoose.model('Ticket', TicketSchema);