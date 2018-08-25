'use strict';

const constantFile = require('../utils/Constant');

const regexString = new RegExp(constantFile.regex.STRINGS_WITH_SPACES);


function ticketValidation(ticketModel_IN){

    for(let item of ticketModel_IN.stn_shoppingList){
        if(!item.stn_nameProduct || !regexString.test(item.stn_nameProduct)){
            return false;
        }
    }
    return true;

}

module.exports = {
    ticketValidation
};