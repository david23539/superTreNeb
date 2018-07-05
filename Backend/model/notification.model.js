'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = Schema({
    stn_class:String,
    stn_item: String
});
// eslint-disable-next-line no-undef
module.exports = mongoose.model('STN_Notification', NotificationSchema);