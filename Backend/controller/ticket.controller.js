'use strict';

const validationGlobal = require('../Validation/global.validation');
const constantFile = require('../utils/Constant')
const adapterTicket = require('../adapter/ticket.adapter');
const validationTicket = require('../Validation/ticket.validation');



function createTicket(req, res){
    let param_IN = req.body;
    let ticketModel = adapterTicket.adapterTicket(param_IN);
    if(validationTicket.ticketValidation(ticketModel._doc) && validationGlobal.validateId(param_IN.direccionIp.navegador)){
        ticketModel.save((err, ticket_OUT) =>{
            if(err || !ticket_OUT){
                res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.ERROR_GENERATE_TICKET})
            }else{
                res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.SUCCESS_GENERATE_TICKET})
            }
        })
    }else{
        paramsIvalids(res)
    }
}


function paramsIvalids(res){
    res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.ERROR_PARAMETROS_ENTRADA})
}

// eslint-disable-next-line no-undef
module.exports ={
    createTicket
};


