'use strict'


const client = require('redis').createClient({detect_buffers: true});


exports.limit = function(req, res, next){

    /*client.get("value!", function (err, reply) {
        //console.log(reply.toString()); // Will print `OK`
        if(err){
            return res.status(200).send(err)
        }else if(!reply){
            client.set('key', 'value!');
            next();

        }else{
            console.log(reply);
            next();
        }
    });*/


// This will return a JavaScript String
    client.get("foo_rand00000001", function (err, reply) {
       // console.log(reply.toString()); // Will print `OK`
        if(reply !== 'OK'){
            client.set("foo_rand00000001", "OK",'PX',1000 * 60 * 60, (e)=>{});
            next();
        }else{
            return res.status(500).send('demasiadas veces logeado espera 10 segundos')
        }

    });




    //next();

};