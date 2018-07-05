'use strict';

const NotificationModel = require('../model/notification.model');

function adapterNotification_IN(class_In, id_Item){
    let params = new NotificationModel();
    params.stn_class = class_In;
    params.stn_item = id_Item;
    return params
}

// eslint-disable-next-line no-undef
module.exports ={
    adapterNotification_IN
}