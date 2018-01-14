'use strict'
// const Person = require('../model/personData.model')
const User = require('../model/user.model')
const Log = require('log'), log = new Log('info')
const constantFile = require('../Constant')

function rollBack(collection, idUsuario){
	if(collection == 'person'){
		User.findByIdAndRemove(idUsuario, (err, usuarioRemove)=>{
			if(err){
				log.error(constantFile.functions.ERRO_DROP_OBJECT)
			}else if(!usuarioRemove){
				log.error(constantFile.functions.ERRO_DROP_OBJECT)
			}else{
				log.error(constantFile.functions.SUCCES_DROP_OBJECT + usuarioRemove)
			}
		})
	}
}

// eslint-disable-next-line no-undef
module.exports = {
	rollBack
}