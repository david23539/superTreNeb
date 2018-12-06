'use strict';
const TicketModel = require('../model/ticket.model');
const moment = require('moment-timezone');
const shopingList = require('../model/shoppingList.model');

function adapterTicket(paramIN) {
    let ticketModel = new TicketModel();

    let totalPrice = 0;
    let arrayShopping = [];
    for (let item of paramIN.shoppingList){
        arrayShopping.push({
            'stn_nameProduct' : item.product,
            'stn_quantityProduct' : item.quantity,
            'stn_unitPrice' : item.finalPrice
        });



        /*shopingList.stn_nameProduct = item.product;
        shopingList.stn_quantityProduct = item.quantity;
        shopingList.stn_unitPrice = item.finalPrice;
        arrayShopping.push(shopingList);*/
        totalPrice += item.finalPrice * item.quantity;
    }
    ticketModel.stn_shoppingList = arrayShopping;
    ticketModel.stn_priceTicket = totalPrice;
    ticketModel.stn_numberTicket = paramIN.idTicket;
    ticketModel.stn_dateTicket = new Date();
    return ticketModel;


}

function adapterFindTicket(paramIN) {
    let ticketModel = new TicketModel();
    ticketModel.stn_numberTicket = paramIN.ticket.idTicket?paramIN.ticket.idTicket:null;
    ticketModel.stn_dateTicket = paramIN.ticket.dateTicket?paramIN.ticket.dateTicket:null;
    ticketModel.stn_priceTicket = paramIN.ticket.price?paramIN.ticket.price:null;
    return ticketModel;
}

function adapterTicketOUT(ticket_IN){

    let ticketOut = [];

    for(let supetItem of ticket_IN){
        let shopingArray = [];
        for(let item of supetItem._doc.stn_shoppingList){
            let dataOut = {};
            dataOut.price = item.stn_unitPrice;
            dataOut.quantity = item.stn_quantityProduct;
            dataOut.name = item.stn_nameProduct;
            shopingArray.push(dataOut);
        }
        let spain = moment.tz(supetItem._doc.stn_dateTicket,'Europe/Madrid').format('DD-MM-YYYY');
        let dataPrevObject = {

            number: supetItem._doc.stn_numberTicket,
            date: spain,
            price: supetItem._doc.stn_priceTicket,
            shopping: shopingArray,
        };
        ticketOut.push(dataPrevObject)
    }

    return ticketOut;



}
module.exports = {
    adapterTicket,
    adapterFindTicket,
    adapterTicketOUT
};
