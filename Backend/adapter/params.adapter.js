'use strict'

function adapterParamsFormat(){
	let params = {
		usuario :{
			nombreUsuario : ''
		},
		direccionIp:{
			direccionData: '',
			navegador: ''
		}
	}

	return params
}

// eslint-disable-next-line no-undef
module.exports = {
	adapterParamsFormat
}