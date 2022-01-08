const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteSchema = new Schema({
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

module.exports = mongoose.model('Route', RouteSchema);