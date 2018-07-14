'use strict';
const express = require('express');
const api = express.Router();
const notificationcontroller = require('../controller/notification.controller');
const md_auth = require('../middleware/autenticate.middleware');


api.get('/getNotifications', md_auth.ensureAuth, notificationcontroller.checkNotifications);









// eslint-disable-next-line no-undef
module.exports = api;