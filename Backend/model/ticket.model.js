'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaShopingList = require('./shoppingList.model');

const TicketSchema = Schema({
    stn_shoppingList: [schemaShopingList],
    stn_priceTicket: Number,
    stn_numberTicket:Number,
    stn_dateTicket: Date

});
// eslint-disable-next-line no-undef
module.exports = mongoose.model('STN_Ticket', TicketSchema);