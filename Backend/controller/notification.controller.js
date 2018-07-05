'use strict';

const NotificationModel = require('../model/notification.model');
const constantFile = require('../utils/Constant');
const AdapterNotification = require('../adapter/notification.adapter');
const ProductController = require('./product.controller');

function addNotification (class_IN, idItem){
    let notification_IN = AdapterNotification.adapterNotification_IN(class_IN,idItem);
    findSingleNotification(class_IN, idItem, (err, notification_OUT)=>{
        if(notification_OUT.length === 0){
            notification_IN.save();
        }
    })
}

function findSingleNotification(class_IN, idItem, cb){
    NotificationModel.find({stn_class:class_IN, stn_item:idItem}, cb);
}

function getNotifications(res){
    NotificationModel.find().exec((err, notificatonsList_OUT)=>{
        if(err){
            res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.NOTIFICATION_FAIL});
        }else if(notificatonsList_OUT.length === 0){
            res.status(constantFile.httpCode.PETITION_CORRECT).send({notification: 0});
        }else{
            let resultNotifications = getCompleteData(notificatonsList_OUT);
            if(resultNotifications.product.length > 0){
                ProductController.getAllProductsByListIds(res, resultNotifications.product)//TODO No es capaz de llamar de nuevo a product Controller
            }else{
                res.status(constantFile.httpCode.INTERNAL_SERVER_ERROR).send({message: constantFile.functions.NOTIFICATION_FAIL});
            }
        }
    })
}

function getCompleteData(notificationList_IN){
    let listProducts = [];
    let result = {
        product:listProducts

    };
    for(let item of notificationList_IN){
        if(item._doc.stn_class === 'Product'){
            listProducts.push({ObjectId: item._doc.stn_item})
        }
    }
    return result;
}

function paramsIvalids(res){
    res.status(constantFile.httpCode.PETITION_CORRECT).send({message: constantFile.functions.ERROR_PARAMETROS_ENTRADA})
}

module.exports ={
    addNotification,
    findSingleNotification,
    getNotifications
}