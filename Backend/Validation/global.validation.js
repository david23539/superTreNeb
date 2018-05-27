'use strict';
const constantFile = require('../utils/Constant');

const regexString = new RegExp(constantFile.regex.STRINGS_WITH_SPACES);

function validateId(id){
    if(!id){
        return false;
    }else{
        return regexString.test(id);
    }
}

function validationPage(page){
    return regexString.test(page);
}

module.exports = {
    validateId,
    validationPage
}