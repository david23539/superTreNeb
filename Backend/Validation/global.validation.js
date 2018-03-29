'use strict'
const constantFile = require('../utils/Constant')

const regexString = new RegExp(constantFile.regex.STRINGS)

function validateId(id){
    if(!id){
        return false
    }else{
        return regexString.test(id)
    }
}

module.exports = {
    validateId
}