const Ticket = require('../models/ticket');
const User = require('../models/user');
const Route = require('../models/route');
const AvailableRoute = require('../models/availableRoute');
const SubRoute = require('../models/subroute');
const moment = require('moment');

module.exports.index = async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);
    const tickets = await Ticket.find({ '_id': { $in: user.tickets } });

    res.render('tickets/tickets', { tickets, user });
};

module.exports.renderNewForm = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    res.render('tickets/new', { user });
};

module.exports.searchRoutes = async (req, res) => {
    const { direction, from, to, date } = req.body;
    const { id } = req.params;

    beginningOfDay = moment(date);
    endOfDay = moment(date).set({ 'hour': 23, 'minutes': 59 });

    // Get routes from this day
    const routesOfTheDay = await Route.find({
        "$and": [
            { "route.direction": direction },
            { "route.stations.name": from },
            { "route.stations.departureTime": { $gt: beginningOfDay.toDate(), $lt: endOfDay.toDate() } }
        ]
    })

    indexOfFirstStation = routesOfTheDay[0].route.stations.indexOf(from);
    if (indexOfFirstStation === -1) {
        indexOfFirstStation = routesOfTheDay[0].route.stations.length - 1;
    }

    // Store the available routes in the DB in order to show them on the showroutes page
    for (let i = 0; max = routesOfTheDay.length, i < max; i++) {
        const route = routesOfTheDay[i].route
        const departureTime = routesOfTheDay[i].route.stations[indexOfFirstStation].departureTime;

        const availableRoute = await new AvailableRoute({ direction, to, from, date: departureTime, route });
        availableRoute.save();
    }

    res.redirect(`/${id}/tickets/new/showroutes`);
};

module.exports.showRoutes = async (req, res) => {
    const { id } = req.params;
    const routes = await AvailableRoute.find()
    console.log(`Available Routes: ${routes}`)
    res.render("tickets/showroutes", { routes, id });
};

module.exports.purchaseTicket = async (req, res) => {
    const { id, routeId } = req.params;

    // Create a subroute containing only the stops in between to and from
    const availableRoute = await AvailableRoute.findById(routeId);

    indexes = [];
    for (let i = 0; max = availableRoute.route.stations.length, i < max; i++) {
        if (availableRoute.route.stations[i].name === availableRoute.to || availableRoute.route.stations[i].name === availableRoute.from) {
            indexes.push(i);
        }
    }

    const stations = availableRoute.route.stations.slice(indexes[0], indexes[1]);
    const { to, from, date } = availableRoute;
    const { direction } = availableRoute.route;

    const subroute = await new SubRoute({ to, from, subroute: { direction, stations } });
    await subroute.save()

    const price = stations.length * 100;
    // Create a new ticket
    const ticket = await new Ticket({ to, from, date, userId: id, route: subroute, price })
    await ticket.save()

    // Get the user from the id
    const user = await User.findById(id);
    // Store the ticket id in the users tickets array
    user.tickets.push(ticket);
    await user.save();

    // DELETE THE AVAILABLE ROUTES
    await AvailableRoute.deleteMany({});

    res.redirect(`/${id}/tickets`);
};

module.exports.showTicket = async (req, res) => {
    const { id, ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId);
    const user = await User.findById(id);

    res.render('tickets/show', { ticket, user });
};

module.exports.cancelTicket = async (req, res) => {
    const { id, ticketId } = req.params;

    await Ticket.findByIdAndDelete(ticketId);

    const user = await User.findById(id);
    user.tickets = user.tickets.filter(function (elem) {
        return elem.toString() !== ticketId;
    });
    await user.save();

    res.redirect(`/${id}/tickets`);
};