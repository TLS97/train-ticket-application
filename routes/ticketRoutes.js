const express = require('express');
const router = express.Router();
const tickets = require('../controllers/tickets');

router.get('/:id/tickets', tickets.index);

router.route('/:id/tickets/new')
    .get(tickets.renderNewForm)
    .post(tickets.searchRoutes);

router.get('/:id/tickets/new/showroutes', tickets.showRoutes);

router.post('/:id/tickets/new/showroutes/:routeId', tickets.purchaseTicket);

router.route('/:id/tickets/:ticketId')
    .get(tickets.showTicket)
    .delete(tickets.cancelTicket);

module.exports = router;