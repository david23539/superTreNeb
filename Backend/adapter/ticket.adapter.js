'use strict';
const TicketModel = require('../model/ticket.model');
const moment = require('moment-timezone');
const shopingList = require('../model/shoppingList.model');

function adapterTicket(paramIN) {
    let ticketModel = new TicketModel();

    let totalPrice = 0;
    let arrayShopping = [];
    for (let item of paramIN.shoppingList){
        shopingList.stn_nameProduct = item.product;
        shopingList.stn_quantityProduct = item.quantity;
        shopingList.stn_unitPrice = item.finalPrice;
        arrayShopping.push(shopingList);
        totalPrice += item.finalPrice * item.quantity;
    }
    ticketModel.stn_shoppingList = arrayShopping;
    ticketModel.stn_priceTicket = totalPrice;
    ticketModel.stn_numberTicket = new Date().getTime();
    ticketModel.stn_dateTicket = new Date();
    return ticketModel;


}

module.exports = {
    adapterTicket
};