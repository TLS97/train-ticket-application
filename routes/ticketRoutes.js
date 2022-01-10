const express = require('express');
const router = express.Router();
const tickets = require('../controllers/tickets');
const { isLoggedIn } = require('../middleware');

router.get('/:id/tickets', isLoggedIn, tickets.index);

router.route('/:id/tickets/new')
    .get(isLoggedIn, tickets.renderNewForm)
    .post(isLoggedIn, tickets.searchRoutes);

router.get('/:id/tickets/new/showroutes', isLoggedIn, tickets.showRoutes);

router.post('/:id/tickets/new/showroutes/:routeId', isLoggedIn, tickets.purchaseTicket);

router.route('/:id/tickets/:ticketId')
    .get(isLoggedIn, tickets.showTicket)
    .delete(isLoggedIn, tickets.cancelTicket);

module.exports = router;
