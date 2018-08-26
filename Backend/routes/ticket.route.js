'use strict';

const express = require('express');
const api = express.Router();
const ticketController = require('../controller/ticket.controller');
const md_auth = require('../middleware/autenticate.middleware');

api.post('/createTicket', md_auth.ensureAuth, ticketController.createTicket);
api.post('/filterTicket', md_auth.ensureAuth, ticketController.filterTicket);
api.post('/getTicket', md_auth.ensureAuth, ticketController.getTickets);
api.get('/countTickets', md_auth.ensureAuth, ticketController.countTicket);


// eslint-disable-next-line no-undef
module.exports = api;