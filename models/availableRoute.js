const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AvailableRouteSchema = new Schema({
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
        required: true
    },
    route: {
        direction: {
            type: String,
            required: true
        },
        stations: [
            {
                name: {
                    type: String,
                    required: true
                },
                departureTime: {
                    type: Date,
                    required: true
                }
            }
        ]
    }
})

module.exports = mongoose.model('AvailableRoute', AvailableRouteSchema);