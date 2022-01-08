const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const SubRouteSchema = new Schema({
    to: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    subroute: {
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
});

module.exports = model('SubRoute', SubRouteSchema);