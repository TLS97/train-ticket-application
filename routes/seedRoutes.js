const express = require('express');
const router = express.Router();
const Route = require('../models/route');
const moment = require('moment');

router.get('/seed', async (req, res) => {
    const now = moment();
    let end = now.add(30, "days");
    const routes = [];

    for (let start = moment(); start <= end; start.add(1, "days")) {

        // Setting the departure time from Oslo S as a reference for the other departure times
        start.set({
            'hour': 5,
            'minutes': 0
        });

        northbound1 = {
            direction: "northbound",
            stations: [
                {
                    name: "Oslo S",
                    departureTime: start.toDate()
                },
                {
                    name: "Oslo Lufthavn St.",
                    departureTime: start.add(26, 'minutes').toDate()
                },
                {
                    name: "Trondheim St.",
                    departureTime: start.add({ 'hours': 6, 'minutes': 12 }).toDate()
                },
                {
                    name: "Trondheim Lufthavn St.",
                    departureTime: start.add({ 'minutes': 33 }).toDate()
                },
                {
                    name: "Mo i Rana St.",
                    departureTime: start.add({ 'hours': 6, 'minutes': 12 }).toDate()
                },
                {
                    name: "Bodø St.",
                    departureTime: start.add({ 'hours': 2, 'minutes': 3 }).toDate()
                }
            ]
        }

        start.set({
            'hour': 14,
            'minutes': 48
        });

        northbound2 = {
            direction: "northbound",
            stations: [
                {
                    name: "Oslo S",
                    departureTime: start.toDate()
                },
                {
                    name: "Oslo Lufthavn St.",
                    departureTime: start.add(26, 'minutes').toDate()
                },
                {
                    name: "Trondheim St.",
                    departureTime: start.add({ 'hours': 6, 'minutes': 12 }).toDate()
                },
                {
                    name: "Trondheim Lufthavn St.",
                    departureTime: start.add({ 'minutes': 33 }).toDate()
                },
                {
                    name: "Mo i Rana St.",
                    departureTime: start.add({ 'hours': 6, 'minutes': 12 }).toDate()
                },
                {
                    name: "Bodø St.",
                    departureTime: start.add({ 'hours': 2, 'minutes': 3 }).toDate()
                }
            ]
        }

        start.set({
            'date': start.date() - 1,
            'hour': 22,
            'minutes': 19
        });

        northbound3 = {
            direction: "northbound",
            stations: [
                {
                    name: "Oslo S",
                    departureTime: start.toDate()
                },
                {
                    name: "Oslo Lufthavn St.",
                    departureTime: start.add(26, 'minutes').toDate()
                },
                {
                    name: "Trondheim St.",
                    departureTime: start.add({ 'hours': 6, 'minutes': 12 }).toDate()
                },
                {
                    name: "Trondheim Lufthavn St.",
                    departureTime: start.add({ 'minutes': 33 }).toDate()
                },
                {
                    name: "Mo i Rana St.",
                    departureTime: start.add({ 'hours': 6, 'minutes': 12 }).toDate()
                },
                {
                    name: "Bodø St.",
                    departureTime: start.add({ 'hours': 2, 'minutes': 3 }).toDate()
                }
            ]
        }

        start.set({
            'date': start.date() - 1,
            'hour': 7,
            'minutes': 32
        });

        southbound1 = {
            direction: "southbound",
            stations: [
                {
                    name: "Bodø St.",
                    departureTime: start.toDate()
                },
                {
                    name: "Oslo Lufthavn St.",
                    departureTime: start.add({ 'hours': 2, 'minutes': 3 }).toDate()
                },
                {
                    name: "Trondheim St.",
                    departureTime: start.add({ 'hours': 6, 'minutes': 12 }).toDate()
                },
                {
                    name: "Trondheim Lufthavn St.",
                    departureTime: start.add({ 'minutes': 33 }).toDate()
                },
                {
                    name: "Mo i Rana St.",
                    departureTime: start.add({ 'hours': 6, 'minutes': 12 }).toDate()
                },
                {
                    name: "Oslo S",
                    departureTime: start.add({ 'minutes': 26 }).toDate()
                }
            ]
        }

        start.set({
            'hour': 16,
            'minutes': 3
        });

        southbound2 = {
            direction: "southbound",
            stations: [
                {
                    name: "Bodø St.",
                    departureTime: start.toDate()
                },
                {
                    name: "Oslo Lufthavn St.",
                    departureTime: start.add({ 'hours': 2, 'minutes': 3 }).toDate()
                },
                {
                    name: "Trondheim St.",
                    departureTime: start.add({ 'hours': 6, 'minutes': 12 }).toDate()
                },
                {
                    name: "Trondheim Lufthavn St.",
                    departureTime: start.add({ 'minutes': 33 }).toDate()
                },
                {
                    name: "Mo i Rana St.",
                    departureTime: start.add({ 'hours': 6, 'minutes': 12 }).toDate()
                },
                {
                    name: "Oslo S",
                    departureTime: start.add({ 'minutes': 26 }).toDate()
                }
            ]
        }

        start.set({
            'date': start.date() - 1,
            'hour': 23,
            'minutes': 51
        });

        southbound3 = {
            direction: "southbound",
            stations: [
                {
                    name: "Bodø St.",
                    departureTime: start.toDate()
                },
                {
                    name: "Oslo Lufthavn St.",
                    departureTime: start.add({ 'hours': 2, 'minutes': 3 }).toDate()
                },
                {
                    name: "Trondheim St.",
                    departureTime: start.add({ 'hours': 6, 'minutes': 12 }).toDate()
                },
                {
                    name: "Trondheim Lufthavn St.",
                    departureTime: start.add({ 'minutes': 33 }).toDate()
                },
                {
                    name: "Mo i Rana St.",
                    departureTime: start.add({ 'hours': 6, 'minutes': 12 }).toDate()
                },
                {
                    name: "Oslo S",
                    departureTime: start.add({ 'minutes': 26 }).toDate()
                }
            ]
        }
        routes.push(northbound1, northbound2, northbound3, southbound1, southbound2, southbound3);
    }

    routes.forEach(async route => {
        const newRoute = await new Route({ route: route });
        newRoute.save();
    });

    console.log("Database is seeded with routes");
    res.json({ routes })

});

module.exports = router;