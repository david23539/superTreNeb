'use strict';

const validationGlobal = require('../Validation/global.validation');
const constantFile = require('../utils/Constant')
const adapterTicket = require('../adapter/ticket.adapter');
const validationTicket = require('../Validation/ticket.validation');
const TicketModel = require('../model/ticket.model');



function createTicket(req, res) {
    let param_IN = req.body;
    let ticketModel = adapterTicket.adapterTicket(param_IN);
    if (validationTicket.ticketValidation(ticketModel._doc) && validationGlobal.validateId(param_IN.direccionIp.navegador)) {
        ticketModel.save((err, ticket_OUT) => {
            if (err || !ticket_OUT) {

                res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.ERROR_GENERATE_TICKET})
            } else {
                res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.SUCCESS_GENERATE_TICKET})
            }
        })
    } else {
        paramsIvalids(res);


    }
}

function filterTicket(req, res){
    let param_IN = req.body;
    let ticketModel = adapterTicket.adapterFindTicket(param_IN);
    if(validationTicket.ticketFindValidation(ticketModel._doc) && validationGlobal.validateId(param_IN.direccionIp.navegador)){
        let query = {};
        if(ticketModel.stn_numberTicket){
            query.stn_numberTicket = ticketModel.stn_numberTicket
        }
        if(ticketModel.stn_priceTicket){
            query.stn_priceTicket = ticketModel.stn_priceTicket
        }
        if(ticketModel.stn_dateTicket){
            //abra que lanzar la siguiente query para filtrar bien por fechas
            //{stn_dateTicket:{$gt: new ISODate('2018-08-25')}, stn_dateTicket:{$lt: new ISODate('2018-08-26')}}
            query.stn_dateTicket ={$gt: new ISODate(ticketModel.stn_dateTicket)};
        }
        TicketModel.find(query,(err, tickets_OUT)=>{
            if(err){
                res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.ERROR_GENERATE_TICKET})
            }else if(tickets_OUT.length === 0){
                res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.NO_DATA})
            }else{
                res.status(constantFile.httpCode.PETITION_CORRECT).send({ticket: adapterTicket.adapterTicketOUT(tickets_OUT)})
            }
        })
    }else{
        paramsIvalids(res);
    }

}

function getTickets(req, res){
    const params = req.body;
    if(validationGlobal.validationPage(params.pagination.page)){
        TicketModel.find().skip(params.pagination.page).limit(10).exec((err, ticket_OUT)=>{
            if(err){
                res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.ERROR_GENERATE_TICKET})
            }else if(ticket_OUT.length === 0){
                res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.NO_DATA})
            }else{
                res.status(constantFile.httpCode.PETITION_CORRECT).send({ticket: adapterTicket.adapterTicketOUT(ticket_OUT)})
            }
        })
    }else{
        paramsIvalids(res);

    }
}

function paramsIvalids(res){
    res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.ERROR_PARAMETROS_ENTRADA})
}

// eslint-disable-next-line no-undef
module.exports ={
    createTicket,
    filterTicket,
    getTickets
};


