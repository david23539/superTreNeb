'use strict';

const constantFile = require('../utils/Constant');

const regexString = new RegExp(constantFile.regex.STRINGS_WITH_SPACES);
const regexNumbers = new RegExp(constantFile.regex.NUMBERS_AND_DECIMAL);


function ticketValidation(ticketModel_IN){

    for(let item of ticketModel_IN.stn_shoppingList){
        if(!item.stn_nameProduct || !regexString.test(item.stn_nameProduct)){
            return false;
        }
    }
    return (ticketModel_IN.stn_numberTicket && regexNumbers.test(ticketModel_IN.stn_numberTicket))

}

function ticketFindValidation(ticketModel_IN){
    let validation = false;
    if(ticketModel_IN.stn_numberTicket){
        validation = regexNumbers.test(ticketModel_IN.stn_numberTicket)
    }
    if(ticketModel_IN.stn_dateTicket){
        let date = new Date(ticketModel_IN.stn_dateTicket);
        validation = (date !== constantFile.functions.INVALID_DATE)
    }

    if(ticketModel_IN.stn_priceTicket){
        validation = regexNumbers.test(ticketModel_IN.stn_priceTicket)
    }

    return validation;
}

module.exports = {
    ticketValidation,
    ticketFindValidation
};