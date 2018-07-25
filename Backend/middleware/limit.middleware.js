'use strict';


const client = require('redis').createClient({detect_buffers: true});
const constantFile = require('../utils/Constant');


exports.limit = function(req, res, next){

    client.get(req.connection.remoteAddress, function (err, reply) {
        if(reply !== 'OK'){
            client.set(req.connection.remoteAddress, "OK");
            client.expire(req.connection.remoteAddress, 10);
            next();
        }else{
            return res.status(constantFile.httpCode.FORBIDDEN).send(constantFile.functions.PREVENT_BRUTE_FORCE_ACCESS);
        }
    });
};