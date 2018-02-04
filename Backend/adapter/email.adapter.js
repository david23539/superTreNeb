'use strict'
const adapterParams = require('./params.adapter')

function adapterParamsEmail(user, ip, browser){
	let params = adapterParams.adapterParamsFormat()
	params.usuario.nombreUsuario = user
	params.direccionIp.direccionData = ip
	params.direccionIp.navegador = browser
	return params
}

// eslint-disable-next-line no-undef
module.exports ={
	adapterParamsEmail
}