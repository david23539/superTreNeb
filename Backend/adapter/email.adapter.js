'use strict'

function adapterParamsEmail(user, ip, browser){
	let params = {
		usuario :{
			nombreUsuario : ''
		},
		direccionIp:{
			direccionData: '',
			navegador: ''
		}
	}
	params.usuario.nombreUsuario = user
	params.direccionIp.direccionData = ip
	params.direccionIp.navegador = browser
	return params
}

// eslint-disable-next-line no-undef
module.exports ={
	adapterParamsEmail
}